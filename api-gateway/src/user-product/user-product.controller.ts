import { OnModuleInit, Controller, Get, Delete, Put, Post, Inject, Param, Request, Query, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { UserProductService } from './user-product.service';
import { CreateUserProductDto } from './dto/create-user-product.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateUserProductDto } from './dto/update-user-product.dto';

@ApiTags('user-product')
@Controller('user-product')
export class UserProductController implements OnModuleInit {
  constructor(
    private readonly userProductService: UserProductService,
    @Inject('PRODUCT_SERVICE') private readonly userProductClient: ClientKafka,
  ) {}

  @Public()
  @Get('shop')
  async getUserProduct(@Query() query: PaginationQueryDto) {
    return await this.userProductService.getUserProduct(query);
  }

  @Public()
  @Get('cart')
  async geCartInfo(@Query() query) {
    return await this.userProductService.geCartInfo(query);
  }

  @Get()
  async getOwnUserProduct(@Request() req, @Query() query: PaginationQueryDto) {
    return await this.userProductService.getOwnUserProduct(req.user.id, query);
  }

  @Get(':id')
  async getDetailUserProduct(@Request() req, @Param('id') id: string) {
    return await this.userProductService.getDetailUserProduct(req.user.id, id);
  }
  
  @Post()
  async createUserProduct(@Request() req, @Body() data: CreateUserProductDto) {
    return await this.userProductService.createUserProduct(req.user.id, data);
  }

  @Put(':id')
  async updateUserProduct(@Request() req, @Param('id') id: string, @Body() data: UpdateUserProductDto) {
    return await this.userProductService.updateUserProduct(req.user.id, id, data);
  }

  @Delete(':id')
  async removeUserProduct(@Request() req, @Param('id') id: string) {
    return await this.userProductService.deleteUserProduct(req.user.id, id);
  }
  
  onModuleInit() {
    this.userProductClient.subscribeToResponseOf('user_product_get_list');
    this.userProductClient.subscribeToResponseOf('own_user_product_get_list');
    this.userProductClient.subscribeToResponseOf('user_product_get_detail');
    this.userProductClient.subscribeToResponseOf('user_product_create');
    this.userProductClient.subscribeToResponseOf('user_product_update');
    this.userProductClient.subscribeToResponseOf('user_product_delete');
    this.userProductClient.subscribeToResponseOf('user_product_find_for_cart');
  }
}
