import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CORRECT, INCORRECT, SIZE } from 'src/config/app.constant';
import { Item } from 'src/entities/item.entity';
import { Order } from 'src/entities/order.entity';
import { Package } from 'src/entities/package.entity';
import { getConnection, Repository } from 'typeorm';
import { CompleteItemInPackageEvent } from './events/complete-item-in-package';
import { PackageTransform } from './package.transform';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private readonly packageRepository: Repository<Package>,
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly packageTransform: PackageTransform,
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientKafka,
  ) {}

  async getPackageList(userId: string, query: PaginationQueryDto) {
    const { search, page } = query
    const sql = getConnection().createQueryBuilder()
      .select('package.id as "packageId", package.total, order.name, order.address, order.phone')
      .from(Order, 'order')
      .innerJoin(Package, 'package', 'order.id = package.orderId')
      .where('"package"."userId" = :userId AND "package"."lastmileStatus" is NULL', { userId: userId })
      .limit(SIZE)
      .offset(SIZE * (page - 1))

    const count = await sql.getCount()
    const orders = await sql.getRawMany()
    if (orders) {
      return {
        totalPage: Math.ceil(count / SIZE),
        data: orders
      }
    }
    return INCORRECT;
  }

  async getPackageDetail(packageId: string) {
    const packageData = await getConnection().createQueryBuilder()
      .select('package.id as "packageId", "cardName", code, rarity, box, "releaseDate", image, package.total, order.name, order.address, order.phone, "item"."id" as "itemId", "userProductId", price, quantity')
      .from(Order, 'order')
      .innerJoin(Package, 'package', 'order.id = package.orderId')
      .innerJoin(Item, 'item', 'item.packageId = package.id')
      .where('"package"."id" = :packageId', { packageId: packageId })
      .getRawMany()

    if (packageData) {
      let data = []
      packageData.forEach((p: any) => {
        data.push({
          userProductId: p.userProductId,
          cardName: p.cardName,
          image: p.image,
          code: p.code,
          rarity: p.rarity,
          box: p.box,
          releaseDate: p.releaseDate,
          price: p.price,
          quantity: p.quantity
        })
      })
      data = await this.packageTransform.recursive(data, [])
      return {
        packageId: packageData[0].packageId,
        name: packageData[0].name,
        address: packageData[0].address,
        phone: packageData[0].phone,
        total: packageData[0].total,
        data: data
      }
    }
    return INCORRECT;
  }

  async removePackage(packageId: string, userId: string) {
    const packageData = await this.packageRepository.findOne({
      where: {
        id: packageId,
        userId: userId,
      },
    })
    if (packageData) {
      const response = await this.packageRepository.softDelete(packageId)
      if (response.affected > 0) {
        return CORRECT;
      }
    }
    return INCORRECT;
  }

  async completePackage(packageId: string, userId: string) {
    const packageData =  await this.packageRepository.findOne({
      where: {
        id: packageId,
        userId: userId,
      },
    })

    if (!packageData) {
      return INCORRECT;
    }
    
    const response = await this.packageRepository.update(packageId, { lastmileStatus: '1' });
    if (response.affected <= 0) {
      return INCORRECT;
    }
    
    const items = await this.itemRepository.find({
      where: {
        packageId: packageId
      }
    })

    this.productClient.emit(
      'product_remove_complete_item_in_package',
      new CompleteItemInPackageEvent(
        userId, 
        items.map((item: any) => ({
          userProductId: item.userProductId,
          quantity: item.quantity
        }))
      )
    )
    
    return CORRECT;
  }
}
