import * as fs from 'fs'
import puppeteer from 'puppeteer'
import { JSDOM } from 'jsdom'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

export const GetProperty = async(element, property) => {
  return await (await element.getProperty(property)).jsonValue();
}

@Injectable()
export class CrawlerService {
  constructor(private readonly configService: ConfigService) {}
  
  async crawlData(url: string, coverElement: string, targetElement: string, callback: Function) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { timeout: 50000 })
    
    const listSector = await page.waitForSelector(coverElement)
    const listInnerHtml = await GetProperty(listSector, 'innerHTML')
    
    let results = []
    const dom = new JSDOM(listInnerHtml)
    dom.window.document.querySelectorAll(targetElement).forEach(item => {
      const data = callback(item)
      if (data.length > 1) {
        data.forEach((element: any) => results.push(element))
      } else {
        results.push(data)
      }

      return results
    }) 

    await browser.close()
    return results
  }
  
  async getImageUrl(name: string) {
    const URL = `https://yugipedia.com/wiki/${name.replaceAll(' ', '_')}`
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    await page.goto(URL, {timeout: 50000});
    await page.waitForSelector('.cardtable-main_image-wrapper', { visible: true });
    const dom = new JSDOM(await page.content());
    const imageUrl = dom.window.document.querySelector('.cardtable-main_image-wrapper > a > img').getAttribute('src')
    await browser.close();

    return imageUrl
  }

  async downloadImage(url: string, name: string) {
    if (url == '') {
      return false
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const viewSource = await page.goto(url, {timeout: 50000});
    if (!fs.existsSync('temps')){
      fs.mkdirSync('temps');
    }
    await fs.promises.writeFile(`temps/${name}.png`, await viewSource.buffer())
    await browser.close();

    return true
  }

  async crawlCardProduct(url: string) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    try {
      await page.goto(url, {
        timeout: 50000
      });
  
      const tBody =  await page.waitForSelector('.t_body')
      const bodyContent = await GetProperty(tBody, 'innerHTML')
      const bodyDom = new JSDOM(bodyContent)

      let result = []
      bodyDom.window.document.querySelectorAll('.inside').forEach(inside => {
        const code = inside.querySelector('.card_number').textContent.replace(/[\t\n]/gm, '')
        const rarity = inside.querySelector('.lr_icon > p').textContent
        const box = inside.querySelector('.pack_name').textContent.replace(/[\t\n]/gm, '')
        const releaseDate = inside.querySelector('.time').textContent.replace(/[\t\n]/gm, '')

        result.push({
          code,
          rarity,
          box,
          releaseDate
        })
      })
      
    } catch (e) {
      console.log(`fail with ${url}`)
    }
    await browser.close()


  }
}
