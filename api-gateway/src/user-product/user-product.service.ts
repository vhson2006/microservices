import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { GetOwnUserProductListEvent } from './events/get-own-user-product-list.event';
import { GetUserProductDetailEvent } from './events/get-user-product-detail.event';
import { DeleteUserProductEvent } from './events/delete-user-product.event';
import { CreateUserProductEvent } from './events/create-user-product.event';
import { UpdateUserProductEvent } from './events/update-user-product.event';
import { GetUserProductListEvent } from './events/get-user-product-list.event';
import { FindUserProductEvent } from './events/find-user-product.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProductService {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly userProductClient: ClientKafka,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}
  

  async getUserProduct(query: PaginationQueryDto) {
    const { search, page, size } = query
    
    return this.userProductClient.send(
      'user_product_get_list', 
      new GetUserProductListEvent(search, page, size)
    );
  }
  
  async geCartInfo(query) {
    const { params } = query
    
    return this.userProductClient.send(
      'user_product_find_for_cart', 
      new FindUserProductEvent(params)
    );
  }

  async getOwnUserProduct(userId: string, query: PaginationQueryDto) {
    const { search, page, size } = query
    
    return this.userProductClient.send(
      'own_user_product_get_list', 
      new GetOwnUserProductListEvent(userId, search, page, size)
    );
  }
  
  async getDetailUserProduct(userId: string, userProductId: string) {
    return this.userProductClient.send(
      'user_product_get_detail', 
      new GetUserProductDetailEvent(userId, userProductId)
    );
  }

  async createUserProduct(userId: string, data: any) {
    const account = await this.accountRepository.findOne({
      where: {
        id: userId,
      },
    });

    return this.userProductClient.send(
      'user_product_create', 
      new CreateUserProductEvent(userId, account.name, data)
    );
  }

  async updateUserProduct(userId: string, userProductId: string, data: any) {
    return this.userProductClient.send(
      'user_product_update', 
      new UpdateUserProductEvent(userId, userProductId, data)
    );
  }

  async deleteUserProduct(userId: string, userProductId: string) {
    return this.userProductClient.send(
      'user_product_delete', 
      new DeleteUserProductEvent(userId, userProductId)
    );
  }
}
