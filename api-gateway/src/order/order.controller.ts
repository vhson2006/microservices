import { OnModuleInit, Controller, Post, Inject, Delete, Param, Put, Request, Body } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { OrderService } from './order.service';
import { OrderDto } from './dto/create-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController implements OnModuleInit {
  constructor(
    private readonly orderService: OrderService,
    @Inject('ORDER_SERVICE') private readonly orderClient: ClientKafka,
  ) {}

  @Public()
  @Post()
  async createOrder(@Body() data: any) {
    const { params, name, address, phone } = data
    return await this.orderService.createOrder(name, address, phone, params);
  }

  @Put(':id')
  async updateOrder(@Request() req, @Param('id') id: string, data: OrderDto) {
    return await this.orderService.updateOrder(req.user.id, id, data);
  }

  @Delete(':id')
  async deleteOrder(@Request() req, @Param('id') id: string) {
    return await this.orderService.deleteOrder(req.user.id, id);
  }
  
  onModuleInit() {
    this.orderClient.subscribeToResponseOf('order_create');
    this.orderClient.subscribeToResponseOf('order_update');
    this.orderClient.subscribeToResponseOf('order_delete');
  }
}
