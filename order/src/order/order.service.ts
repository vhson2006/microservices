import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CORRECT, INCORRECT, SIZE } from 'src/config/app.constant';
import { Item } from 'src/entities/item.entity';
import { Order } from 'src/entities/order.entity';
import { Package } from 'src/entities/package.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>
  ) {}

  async createOrder(params: any) {
    const { data, name, address, phone } = params
    let result = {}
    let total = 0;
    data.forEach((element: any) => {
      total += element.price * element.quantity
      if (result[element.userId]) {
        result[element.userId].push(element)
      } else {
        result[element.userId] = []
        result[element.userId].push(element)
      }
    });
    const keys = Object.keys(result);
    const order = await this.orderRepository.insert({
      total: total.toString(),
      address: address,
      name: name,
      phone: phone
    })

    if (order && order.identifiers && order.identifiers[0]?.id) {
      let current = []
      for (let i = 0; i < keys.length; i++) {
        current = []
        const packageRes = await this.packageRepository.insert({
          orderId: order.identifiers[0].id,
          userId: keys[i],
          total: result[keys[i]].reduce((sum: number, cur: any) => sum + cur.quantity * cur.price, 0).toString(),
        })
        if (packageRes && packageRes.identifiers && packageRes.identifiers[0]?.id) {
          result[keys[i]].map((item: any) => {
            current.push({
              packageId: packageRes.identifiers[0].id,
              userProductId: item.userProductId,
              cardName: item.cardName,
              image: item.image,
              code: item.code,
              rarity: item.rarity,
              releaseDate: item.releaseDate,
              box: item.box,
              price: item.price,
              quantity: item.quantity
            })
          })
          for (let j = 0; j < current.length; j++) {
            await this.itemRepository.insert(current[j])
          }
        }
      }

      return CORRECT;
    }

    return INCORRECT
  }

  async updateOrder(userId: string, orderId: string, data: any) {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      }
    })
    if (order) {
      const response = await this.orderRepository.update(order.id, data)
      if (response.affected > 0) {
        return CORRECT;
      }

      return INCORRECT
    }
    return INCORRECT;
  }

  async deleteOrder(userId: string, orderId: string) {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      }
    })

    if (order) {
      const response = await this.orderRepository.delete(order.id)
      if (response.affected > 0) {
        return CORRECT;
      }

      return INCORRECT
    }

    return INCORRECT
  }
}
