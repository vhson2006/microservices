import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CORRECT, INCORRECT, SIZE } from 'src/config/app.constant';
import { Card } from 'src/entities/card.entity';
import { Product } from 'src/entities/product.entity';
import { UserProduct } from 'src/entities/user-product.entity';
import { getConnection, Repository } from 'typeorm';
import { UserProductTransform } from './user-product.transform';

@Injectable()
export class UserProductService {
  constructor(
    @InjectRepository(UserProduct)
    private readonly userProductRepository: Repository<UserProduct>,
    private readonly userProductTransform: UserProductTransform
  ) {}
  
  async getUserProductForCart(input: any) {
    const { params } = input
    const userProductIds = params.split(",");
    const sql = getConnection().createQueryBuilder()
      .select('"userProduct".id, card.image, card.image as "rawImage", "userProduct"."userId", quantity, price, "card"."id" as "cardId", code, card.type, box, rarity, name, text, attribute, atk, def, level, "userProduct"."createdAt", "releaseDate"')
      .from(UserProduct, 'userProduct')
      .innerJoin(Product, 'product', 'product.id = userProduct.productId')
      .innerJoin(Card, 'card', 'card.link = product.link AND card.language = product.language')
      .whereInIds(userProductIds)    

    const userProducts = await sql.getRawMany()
    if (userProducts) {
      return await this.userProductTransform.recursive(userProducts, [])
    }
    return INCORRECT;
  }

  async getUserProductList(query: PaginationQueryDto) {
    const { search, page } = query
    const sql = getConnection().createQueryBuilder()
      .select('"userProduct".id, card.image, "userProduct"."userId", "userName", quantity, price, "card"."id" as "cardId", code, card.type, box, rarity, name, text, attribute, atk, def, level, "userProduct"."createdAt", "releaseDate"')
      .from(UserProduct, 'userProduct')
      .innerJoin(Card, 'card', 'card.id = userProduct.cardId')
      .innerJoin(Product, 'product', 'product.id = userProduct.productId')
      .where('(card.name LIKE :search OR product.code LIKE :search) AND "userProduct".quantity > 0', { search: '%' + search + '%' })
      .orderBy('"userProduct".id')
      .limit(SIZE)
      .offset(SIZE * (page - 1))

    const count = await sql.getCount()
    const userProducts = await sql.getRawMany()
    if (userProducts) {
      const data = await this.userProductTransform.recursive(userProducts, [])
      return {
        totalPage: Math.ceil(count / SIZE),
        data: data
      }
    }
    return INCORRECT;
  }

  async getOwnUserProductList(userId: string, query: PaginationQueryDto) {
    const { search, page } = query
    const sql = getConnection().createQueryBuilder()
      .select('"userProduct".id, card.image, "userProduct"."userId", quantity, price, "card"."id" as "cardId", code, card.type, box, rarity, name, text, attribute, atk, def, level, "userProduct"."createdAt", "releaseDate"')
      .from(UserProduct, 'userProduct')
      .innerJoin(Product, 'product', 'product.id = userProduct.productId')
      .innerJoin(Card, 'card', 'card.link = product.link AND card.language = product.language')
      .where(
        '"userProduct"."userId" = :userId AND (card.name LIKE :search OR product.code LIKE :search)', 
        { search: '%' + search + '%', userId: userId }
      )
      .orderBy('"userProduct".id')
      .limit(SIZE)
      .offset(SIZE * (page - 1))
    
    const count = await sql.getCount()
    const userProducts = await sql.getRawMany()
    if (userProducts) {
      const data = await this.userProductTransform.recursive(userProducts, [])
      return {
        totalPage: Math.ceil(count / SIZE),
        data: data
      }
    }
    return INCORRECT;
  }

  async getUserProductDetail(userId: string, userProductId: string) {
    const userProduct = await this.userProductRepository.findOne({
      where: {
        id: userProductId,
        userId: userId
      }
    })
    if (userProduct) {
      return userProduct
    }
    return INCORRECT;
  }

  async createUserProduct(userId: string, userName: string, data: any) {
    const { name, code, ...remain } = data
    const card = await getConnection().createQueryBuilder()
      .select()
      .from(Card, "card")
      .where("card.name = :name", { name: name })
      .getRawOne()

    if (!card) {
      return INCORRECT
    }

    const product = await getConnection().createQueryBuilder()
      .select()
      .from(Product, "product")
      .where("product.code = :code", { code: code })
      .andWhere("product.link = :link", { link: card.link })
      .andWhere("product.language = :language", { language: card.language })
      .getRawOne()

    let params = {
      userId: userId,
      userName: userName,
      cardId: card.id,
      ...remain
    }
    if (product) {
      params = {
        ...params,
        productId: product.id,
      }
    }
    
    const response = await this.userProductRepository.insert(params)
    if (response && response.identifiers && response.identifiers[0]?.id) {
      return CORRECT;
    }

    return INCORRECT
  }

  async updateUserProduct(userId: string, userProductId: string, data: any) {
    const userProduct = await this.userProductRepository.findOne({
      where: {
        id: userProductId,
        userId: userId
      }
    })
    if (userProduct) {
      const response = await this.userProductRepository.update(userProduct.id, data)
      if (response.affected > 0) {
        return CORRECT;
      }

      return INCORRECT
    }
    return INCORRECT;
  }

  async deleteUserProduct(userId: string, userProductId: string) {
    const userProduct = await this.userProductRepository.findOne({
      where: {
        id: userProductId,
        userId: userId
      }
    })

    if (userProduct) {
      const response = await this.userProductRepository.softDelete(userProduct.id)
      if (response.affected > 0) {
        return CORRECT;
      }

      return INCORRECT
    }

    return INCORRECT
  }

  async completeItemInPackage(userId: string, data: any) {
    let current: any = {}
    for (const item of data) {
      current = await this.userProductRepository.findOne(item.userProductId);
      await this.userProductRepository.update({
        id: item.userProductId,
        userId: userId
      }, {
        quantity: (+current.quantity - item.quantity).toString()
      })
    }
  }
}

