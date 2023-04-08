import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { NewsService } from './news.service';

@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @MessagePattern('news_get_list')
  async getNews(data: any) {
    const { value } = data
    const response = await this.newsService.getNews(value);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      data: response,
    };
  }
  @MessagePattern('news_get_detail')
  async getDetailNews(data: any) {
    const { value } = data
    const response = await this.newsService.getDetailNews(value);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      data: response,
    };
  }
}
