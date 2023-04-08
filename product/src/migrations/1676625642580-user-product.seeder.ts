import { readFile } from "fs/promises";
import { Card } from "src/entities/card.entity";
import { Product } from "src/entities/product.entity";
import { UserProduct } from "src/entities/user-product.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProductSeeder1676625642580 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const {userProduct} = JSON.parse(await readFile("src/migrations/data/user-product.json", "utf8"));
    let selectId = Math.round(Math.random())
    for (const values of userProduct) {
      const account = await queryRunner.manager.query(`SELECT * FROM "auth"."account" WHERE "email" in('sonvh@gmail.com', 'admin@gmail.com')`);
      const card = await queryRunner.manager.createQueryBuilder()
        .select()
        .from(Card, "card")
        .where("card.name = :name", { name: values.name })
        .getRawOne()

      const product = await queryRunner.manager.createQueryBuilder()
        .select()
        .from(Product, "product")
        .where("product.code = :code", { code: values.code })
        .getRawOne()
      selectId = Math.round(Math.random())
      await queryRunner.manager.createQueryBuilder()
        .insert()
        .into("user-product")
        .values({
          cardId: card.id,
          productId: product.id,
          userId: account[selectId].id,
          userName: account[selectId].name,
          price: values.price,
          quantity: values.quantity
        })
        .execute()
    }
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder()
      .delete()
      .from(UserProduct, "user-product")
      .execute();
  }

}
