import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { Card } from 'src/entities/card.entity';
import { Repository } from 'typeorm';
import {getConnection} from "typeorm"; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly configService: ConfigService
  ) {}
  
  

  async getCardList(value: any) {
    const { search, page, size } = value

    const query = getConnection().createQueryBuilder()
      .select('*')
      .from(Card, 'card')
      .where('card.name LIKE :search', { search: '%' + search + '%' })
      .limit(size)
      .offset(size * (page - 1))
    
    const data = await query.getRawMany()
    if (data) {      
      return data
    }
    
    return INCORRECT;
  }

  
}
