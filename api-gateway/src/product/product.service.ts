import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetProductListEvent } from './events/get-product-list.event'
import { GetProductDetailEvent } from './events/get-product-detail.event'
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productsClient: ClientKafka,
  ) {}

  async getProduct(query: PaginationQueryDto) {
    const { search, page, size } = query
    return this.productsClient.send('product_get_list', new GetProductListEvent(search, page, size));
  }
  
  async getDetailProduct(id: string) {
    return this.productsClient.send('product_get_detail', new GetProductDetailEvent(id));
  }
}
