import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { Like, Repository } from 'typeorm';
import { News } from '../entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>
  ) {}

  async getNews(value: any) {
    const { search, page, size } = value
    const news = await this.newsRepository.find({
      where: [
        { title: Like(`%${search}%`) },
        { content: Like(`%${search}%`) },
      ],
      skip: size * (page - 1),
      take: size
    })

    if (news) {
      return news
    }
    return INCORRECT;
  }

  async getDetailNews(value: any) {
    const { id } = value
    const news = await this.newsRepository.findOne({
      where: { id: id }
    })

    if (news) {
      return news
    }
    return INCORRECT;
  }
}
