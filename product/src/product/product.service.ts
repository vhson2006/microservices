import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { Card } from 'src/entities/card.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import {getConnection} from "typeorm"; 
import { transformProduct } from './product.transform';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly configService: ConfigService
  ) {}
  
  async getSigned(file: string) {
    const client = new S3Client({
      credentials: {
        accessKeyId: this.configService.get('aws.id'),
        secretAccessKey: this.configService.get('aws.secret'),
      },
      region: this.configService.get('aws.region')
    });
    const command = new GetObjectCommand({
      Bucket: this.configService.get('aws.bucket'),
      Key: file,
    });
    
    return await getSignedUrl(client, command, { expiresIn: 300 });
  }

  async getProductList(value: any) {
    const { search, page, size } = value

    const query = getConnection().createQueryBuilder()
      .select('*')
      .from(Product, 'product')
      .innerJoin(Card, 'card', 'card.link = product.link AND card.language = product.language')
      .where('card.name LIKE :search', { search: '%' + search + '%' })
      .orWhere('card.text LIKE :search', { search: '%' + search + '%' })
      .orWhere('product.code LIKE :search', { search: '%' + search + '%' })
      .limit(size)
      .offset(size * (page - 1))
    
    const data = await query.getRawMany()
    if (data) {
      let results = await this.recursive(data, [])
      
      return transformProduct(results)
    }
    
    return INCORRECT;
  }

  async recursive(data, results) {
    if (data.length < 1) {
      return results
    } else {
      const current = data.pop()
      try {
        current.image = await this.getSigned(current.image)
        results.push(current)

      } catch (e) {

      }

      return this.recursive(data, results)
    }
  }

  async getProductDetail(id: string) {
    const query = this.cardRepository
      .createQueryBuilder('card')
      .select('card.image, "card"."id" as "cardId", code, card.type, box, rarity, name, attribute, text, atk, def, level')
      .innerJoin(Product, 'product', 'card.link = product.link AND card.language = product.language')
      .where('card.id = :id', { id })
    
    const data = await query.getRawOne()
    if (data) {
      data.image = await this.getSigned(data.image)
      return data
    }
    
    return INCORRECT;
  }
}
