import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
