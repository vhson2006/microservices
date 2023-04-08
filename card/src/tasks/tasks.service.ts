import * as fs from 'fs';
import { LessThan, Repository } from 'typeorm';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/category.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Card } from 'src/entities/card.entity';
import { S3Service } from 'src/s3/s3.service';
import { CrawlerService } from 'src/crawler/crawler.service';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly fileLogger: LoggerService,
    private readonly s3Service: S3Service,
    private readonly crawlerService: CrawlerService
  ) {}
  
  private readonly logger = new Logger(TasksService.name);
  
  /**
   * Look up new Packs from db.yugioh-card.com
   */
  // @Cron('0 0 23 * * *')
  @Timeout(10000)
  categoriesCrawler() {
    const regions = [
      { language: 'en', group: 'card_list_2' },
      { language: 'en', group: 'card_list_1' },
      { language: 'de', group: 'card_list_2' },
      { language: 'de', group: 'card_list_1' },
      { language: 'ja', group: 'card_list_2' },
      { language: 'ja', group: 'card_list_1' },
      { language: 'fr', group: 'card_list_2' },
      { language: 'fr', group: 'card_list_1' },
      { language: 'it', group: 'card_list_2' },
      { language: 'it', group: 'card_list_1' },
      { language: 'es', group: 'card_list_2' },
      { language: 'es', group: 'card_list_1' },
      { language: 'pt', group: 'card_list_2' },
      { language: 'pt', group: 'card_list_1' },
      { language: 'ko', group: 'card_list_2' },
      { language: 'ko', group: 'card_list_1' },
    ]

    return this.controlCaptureCategories(regions)
  }

  /**
   * Re-check the failure data 
   */
  @Cron('0 15 23 * * *')
  async resetFailData() {
    await this.cardRepository.update({ status: 4 }, { status: 1 })
    await this.categoriesRepository.update({ status: 3 }, { status: 1 })
    const existFiles = await fs.promises.readdir('temps')
    for (const file of existFiles) {
      await fs.promises.unlink(`temps/${file}`);
    }
  }

  /**
   * Craw general card information from Packs 
   */
  @Cron('0 */3 0-22 * * *')
  async cardsCrawler() {
    const category = await this.categoriesRepository.findOne({
      where: [
        { status: 1 }, // The cards in Category isn't sync with origin source, initial status of category
        { createdAt: LessThan(new Date(new Date().setDate(new Date().getDate() - 60))) } // delay 60 days to make sure all data is updated
      ]
    });

    if (category) {
      const { id, link, language } = category
      try {
        const results = await this.crawlerService.crawlData(
          `${link}&request_locale=${language}`, 
          '.list', 
          '.t_row.c_normal', 
          this.covertCard(language)
        )
        const response = await this.controlInsertCard(results)
        if (response) {
          await this.categoriesRepository.update(
            id, 
            { 
              status: 2 // category is sync with origin source
            }
          )
        }
      } catch (error) {
        await this.categoriesRepository.update(
          id, 
          { 
            status: 3 // Category Syncing with origin source fail
          }
        )
        this.fileLogger.error(`${id}: ${error}`)
      }
    }
  }
  
  /**
   * Correct card information from Crawler 
   */
  @Cron('10 */3 0-22 * * *')
  async correctCard() {
    const illegalCard = await this.cardRepository.findOne({
      where: `(name like '%(%')`,
    });

    if (illegalCard) {
      const { id, name } = illegalCard
      await this.cardRepository.update(id, { name: name.replace(/\(.+\)/g, '').trim() })
    }
  }

  /**
   * Check image exist in S3 or not and update status
   */
  @Cron('20 */3 0-22 * * *')
  async checkImageUrl() {
    const uncheckCard = await this.cardRepository.findOne({
      where: `(name not like '%(%') and status = 1 and language = 'en'`,
    });

    if (uncheckCard) {
      const { id, name, link } = uncheckCard
      const exist = await this.s3Service.checkFileExist(
        name.replace(/[\t\n]/gm, '').replaceAll(' ', '_').replaceAll('/', '_') + '.png'
      )
      if (exist) {
        await this.cardRepository.update(
          { link: link }, 
          { 
            image: name.replace(/[\t\n]/gm, '').replaceAll(' ', '_').replaceAll('/', '_') + '.png',
            status: 2 // The card is sync with origin source and have image on S3
          }
        )
      } else {
        await this.cardRepository.update(
          { link: link }, 
          { 
            image: null,
            status: 3 // The card haven't image on S3
          }
        )
      }
    }
  }

  /**
   * Update image status if the Eng pack is done while the other is not
   */
  @Cron('30 */3 0-22 * * *')
  async checkImageUrlIfEngPacIsDone() {
    const uncheckCard = await this.cardRepository.findOne({
      where: `(name not like '%(%') and status = 1 and language != 'en'`,
    });

    if (uncheckCard) {
      const { link } = uncheckCard
      const engCard = await this.cardRepository.findOne({
        where: `(name not like '%(%') and link = '${link}' and language = 'en' and status = 2`,
      });
      if (engCard) {
        await this.cardRepository.update(
          { link: link }, 
          { 
            image: engCard.image,
            status: 2 // The card is sync with origin source and have image on S3
          }
        )
      }
    }
  }

  /**
   * For the card haven't image on S3: Download image and upload to S3
   */
  @Cron('40 */3 0-22 * * *')
  async downloadImage() {
    const notHaveImageCard = await this.cardRepository.findOne({
      where: `(name not like '%(%') and status = 3 and language = 'en'`,
    });

    if (notHaveImageCard) {
      const { id, name, link } = notHaveImageCard
      try {
        const imageUrl = await this.crawlerService.getImageUrl(name)
        const downloadResponse = await this.crawlerService.downloadImage(
          imageUrl, 
          name.replace(/[\t\n]/gm, '').replaceAll(' ', '_').replaceAll('/', '_')
        )
        if (downloadResponse !== true) {
          throw Error('Can not download image')
        }

        const uploadResponse = await this.s3Service.uploadImage(
          name.replace(/[\t\n]/gm, '').replaceAll(' ', '_').replaceAll('/', '_')
        )
        if (uploadResponse) {
          await this.cardRepository.update(
            { link: link }, 
            { 
              image: name.replace(/[\t\n]/gm, '').replaceAll(' ', '_').replaceAll('/', '_') + '.png',
              status: 1 // After update image to S3, reset status of card to initial to re-sync
            }
          )
        } else {
          await this.cardRepository.update(
            { link: link }, 
            { 
              image: null,
              status: 4 // upload image to S3 fail
            }
          )
        }
      } catch (error) {
        this.fileLogger.error(`${id}: ${error}`)
      }
    }
  }

  /**
   * Craw card product information from Card  
   */
  @Cron('50 */3 0-22 * * *')
  async crawlCardProduct() {
    const readyCard = await this.cardRepository.findOne({
      where: { status: 2 },
    });
    
    if (readyCard) {
      const { id, link, language } = readyCard
      try {
        const results = await this.crawlerService.crawlData(
          `${link}&request_locale=${language}`, 
          '.t_body', 
          '.inside', 
          this.convertCardProduct(link, language)
        )
        const response = await this.controlInsertCardProduct(results)
        if (response) {
          await this.cardRepository.update(
            id, 
            { 
              status: 5 // The card have generated all card-product
            }
          )
        }
      } catch (error) {
        this.fileLogger.error(`${id}: ${error}`)
        await this.cardRepository.update(
          id, 
          { 
            status: 6 // The card had generate card-product fail
          }
        )
      }      
    }
  }

  async controlCaptureCategories (params: any[]) {
    if (params.length < 1) {
      return 
    } else {
      const param = params.shift()
      try {
        const { language, group } = param
        const URL = 'https://www.db.yugioh-card.com/yugiohdb/card_list.action?clm=2&request_locale=%s'.replace('%s', language)
        const results = await this.crawlerService.crawlData(URL, '#' + group, '.pac_set', this.convertCategory(group, language))
        await this.controlUpdateCategories(results)
      } catch (e) {
        this.fileLogger.error(e)
      }
  
      return this.controlCaptureCategories(params)
    }
  }
  
  async controlUpdateCategories (params: any[]) {
    if (params.length < 1) {
      return 
    } else {
      const param = params.shift()
      try {
        const category = await this.categoriesRepository.findOne({
          where: {
            name: param.name,
            link: param.link,
            language: param.language
          },
        });
    
        if (category) {
          return this.controlUpdateCategories(params)
        } else {
          await this.categoriesRepository.insert(param)
        }
      } catch (e) {
        this.fileLogger.error(e)
      }
      return this.controlUpdateCategories(params)
    }
  }

  async controlInsertCard (params: any[]) {
    if (params.length < 1) {
      return true
    } else {
      const param = params.shift()
      try {
        const card = await this.cardRepository.findOne({
          where: {
            name: param.name,
            link: param.link,
            language: param.language
          },
        });
        
        if (card) {
          const { id } = card
          await this.cardRepository.update(id, { status: 1 })
          return this.controlInsertCard(params)
        } else {
          await this.cardRepository.insert(param)
        }
      } catch (e) {
        this.fileLogger.error(e)
      }
      return this.controlInsertCard(params)
    }
  }

  async controlInsertCardProduct (params: any[]) {
    if (params.length < 1) {
      return true
    } else {
      const param = params.shift()
      try {
        const card = await this.productRepository.findOne({
          where: {
            link: param.link,
            language: param.language,
            code: param.code,
            rarity: param.rarity,
            box: param.box,
          },
        });
        
        if (card) {
          return this.controlInsertCardProduct(params)
        } else {
          await this.productRepository.insert(param)
        }
      } catch (e) {
        this.fileLogger.error(e)
      }
      return this.controlInsertCardProduct(params)
    }
  }

  convertCategory(group: string, language: string) {
    return (pacSet: any) => {
      let data = []
      const pacSetTitle = pacSet.querySelector('.list_title span').textContent.replace(/[\t\n]/gm, '')
      pacSet.querySelectorAll('.pack').forEach(pack => {
        data.push({
          name: pack.querySelector('strong').textContent.replace(/[\t\n]/gm, ''),
          link: 'https://www.db.yugioh-card.com' + pack.querySelector('input').getAttribute('value').replace(/[\t\n]/gm, ''),
          section: pacSetTitle,
          pacset: group,
          language: language
        })
      })

      return data;
    }
  }

  covertCard(language: string) {
    return (item: any) => ({
      name: item.querySelector('.card_name').textContent.replace(/[\t\n]/gm, ''),
      text: item.querySelector('.box_card_text') ? item.querySelector('.box_card_text').innerHTML.replace(/[\t\n]/gm, '') : '',
      attribute: item.querySelector('.box_card_attribute > span').textContent.replace(/[\t\n]/gm, ''),
      level: item.querySelector('.box_card_level_rank > span') ? item.querySelector('.box_card_level_rank > span').textContent.replace(/[\t\n]/gm, '') : '',
      atk: item.querySelector('.atk_power > span') ? item.querySelector('.atk_power > span').textContent.replace(/[\t\n]/gm, '') : '',
      def: item.querySelector('.def_power > span') ? item.querySelector('.def_power > span').textContent.replace(/[\t\n]/gm, '') : '',
      type: item.querySelector('.card_info_species_and_other_item > span') ? item.querySelector('.card_info_species_and_other_item > span').textContent.replace(/[\t\n]/gm, '') : '',
      language: language,
      link: item.querySelector('.link_value') ? 'https://www.db.yugioh-card.com' + item.querySelector('.link_value').getAttribute('value').replace(/[\t\n]/gm, '') : '',
    })
  }

  convertCardProduct(link: string, language: string, ) {
    return (inside: any) => ({
      link: link,
      language: language,
      code: inside.querySelector('.card_number').textContent.replace(/[\t\n]/gm, ''),
      rarity: inside.querySelector('.lr_icon > p').textContent,
      box: inside.querySelector('.pack_name').textContent.replace(/[\t\n]/gm, ''),
      releaseDate: inside.querySelector('.time').textContent.replace(/[\t\n]/gm, '')
    })
  }
}
