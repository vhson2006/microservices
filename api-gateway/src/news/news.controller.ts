import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Query
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController implements OnModuleInit {
  constructor(
    private readonly newsService: NewsService,
    @Inject('NEWS_SERVICE') private readonly newsClient: ClientKafka,
  ) {}

  @Get()
  @Public()
  async getNews(@Query() query: PaginationQueryDto) {
    return this.newsService.getNews(query);
  }

  @Get(':id')
  @Public()
  async getDetailNews(@Param('id') id: string) {
    return this.newsService.getDetailNews(id);
  }
  
  onModuleInit() {
    this.newsClient.subscribeToResponseOf('news_get_list');
    this.newsClient.subscribeToResponseOf('news_get_detail');
  }
}
