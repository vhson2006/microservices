import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GetCardEvent } from './events/get-card.event';

@Injectable()
export class CardService {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productsClient: ClientKafka,
  ) {}

  async getCard(query: PaginationQueryDto) {
    const { search, page, size } = query
    return this.productsClient.send('card_get_list', new GetCardEvent(search, page, size));
  }
  
}
