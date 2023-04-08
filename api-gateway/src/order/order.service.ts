import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderDto } from './dto/create-order.dto';
import { DeleteOrderEvent } from './events/delete-order.event';
import { CreateOrderEvent } from './events/create-order.event';
import { UpdateOrderEvent } from './events/update-order.event';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE')
    private readonly orderClient: ClientKafka,
  ) {}
  
  async createOrder(name: string, address: string, phone: string, data: any) {
    return this.orderClient.send(
      'order_create', 
      new CreateOrderEvent(name, address, phone, data)
    );
  }
  
  async updateOrder(userId: string, orderId: string, data: OrderDto) {
    return this.orderClient.send(
      'order_update', 
      new UpdateOrderEvent(userId, orderId, data)
    );
  }
  
  async deleteOrder(userId: string, orderId: string) {
    return this.orderClient.send(
      'order_delete', 
      new DeleteOrderEvent(userId, orderId)
    );
  }
}
