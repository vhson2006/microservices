import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('product_get_list')
  async getProductList(data: any) {
    const { value } = data
    const response = await this.productService.getProductList(value);
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
  
  @MessagePattern('product_get_detail')
  async getProductDetail(data: any) {
    const { value } = data 
    const response = await this.productService.getProductDetail(value.id);
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
