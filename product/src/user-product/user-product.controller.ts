import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { UserProductService } from './user-product.service';

@Controller()
export class UserProductController {
  constructor(private readonly userProductService: UserProductService) {}

  @MessagePattern('user_product_get_list')
  async getUserProductList(data: any) {
    const { value } = data
    const response = await this.userProductService.getUserProductList(value);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      ...response,
    };
  }
  
  @MessagePattern('user_product_find_for_cart')
  async getUserProductForCart(data: any) {
    const { value } = data
    const response = await this.userProductService.getUserProductForCart(value);
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

  @MessagePattern('own_user_product_get_list')
  async getOwnUserProductList(data: any) {
    const { value } = data
    const { userId, ...query } = value
    const response = await this.userProductService.getOwnUserProductList(userId, query);
    if (response === INCORRECT) {
      return {
        status: INCORRECT,
        message: 'Something wrong',
      };
    }

    return {
      status: CORRECT,
      ...response,
    };
  }

  @MessagePattern('user_product_get_detail')
  async getUserProductDetail(data: any) {
    const { value } = data
    const { userId, userProductId } = value
    const response = await this.userProductService.getUserProductDetail(userId, userProductId);
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

  @MessagePattern('user_product_create')
  async createUserProduct(params: any) {
    const { value } = params
    const { userId, userName, data } = value
    const response = await this.userProductService.createUserProduct(userId, userName, data);
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

  @MessagePattern('user_product_update')
  async updateUserProduct(params: any) {
    const { value } = params
    const { userId, userProductId, data } = value
    const response = await this.userProductService.updateUserProduct(userId, userProductId, data);
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

  @MessagePattern('user_product_delete')
  async deleteUserProduct(data: any) {
    const { value } = data
    const { userId, userProductId } = value
    const response = await this.userProductService.deleteUserProduct(userId, userProductId);
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

  @EventPattern('product_remove_complete_item_in_package')
  completeItemInPackage(params: any) {
    const { value } = params
    const { userId, data } = value
    this.userProductService.completeItemInPackage(userId, data)
  }
}
