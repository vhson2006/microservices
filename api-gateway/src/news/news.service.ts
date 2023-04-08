import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GetDetailNewEvent } from './events/get-detail-news.event';
import { GetNewListEvent } from './events/get-new-list.event';

@Injectable()
export class NewsService {
  constructor(
    @Inject('NEWS_SERVICE')
    private readonly newsClient: ClientKafka,
  ) {}

  async getNews(query: PaginationQueryDto) {
    const { search, size, page } = query
    
    return this.newsClient.send(
      'news_get_list', 
      new GetNewListEvent(search, page, size)
    );
  }

  async getDetailNews(id: string) {
    
    return this.newsClient.send(
      'news_get_detail', 
      new GetDetailNewEvent(id)
    );
  }
}

