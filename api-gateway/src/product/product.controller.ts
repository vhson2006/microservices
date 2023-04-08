import { Controller, Get, OnModuleInit, Inject, Query, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController implements OnModuleInit {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
  ) {}

  @Public()
  @Get()
  async getProduct(@Query() query: PaginationQueryDto) {
    return this.productService.getProduct(query);
  }

  @Public()
  @Get(':id')
  async getDetailProduct(@Param('id') id: string) {
    return this.productService.getDetailProduct(id);
  }

  onModuleInit() {
    this.productClient.subscribeToResponseOf('product_get_list');
    this.productClient.subscribeToResponseOf('product_get_detail');
  }
}
