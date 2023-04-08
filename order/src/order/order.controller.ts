import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CORRECT, INCORRECT } from 'src/config/app.constant';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  
  @MessagePattern('order_create')
  async createOrder(data: any) {
    const { value } = data
    const response = await this.orderService.createOrder(value);
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
  
  @MessagePattern('order_update')
  async updateOrder(data: any) {
    const { value } = data
    const { userId, orderId, ...params } = value
    const response = await this.orderService.updateOrder(userId, orderId, params);
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
  
  @MessagePattern('order_delete')
  async deleteOrder(data: any) {
    const { value } = data
    const { userId, orderId } = value
    const response = await this.orderService.deleteOrder(userId, orderId);
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
