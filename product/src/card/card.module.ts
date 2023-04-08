import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Product } from '../entities/product.entity'
import { Card } from '../entities/card.entity'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Card]),
    ConfigModule
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
