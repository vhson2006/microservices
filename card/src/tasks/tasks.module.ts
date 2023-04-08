import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlerService } from 'src/crawler/crawler.service';
import { Card } from 'src/entities/card.entity';
import { Categories } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { S3Service } from 'src/s3/s3.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Card, Product]),
    ConfigModule
  ],
  providers: [TasksService, S3Service, CrawlerService],
})
export class TasksModule {}
