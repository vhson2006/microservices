import { readFile } from "fs/promises";
import { Product } from "src/entities/product.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductSeeder1676614571137 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const {product} = JSON.parse(await readFile("src/migrations/data/product.json", "utf8"));
    const sliceIntoChunks = (arr, chunkSize) => {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
      }
      return res;
    }
    const productChunk = sliceIntoChunks(product.map((e: any) => ({
      code: e.code,
      rarity: e.rarity,
      box: e.box,
      releaseDate: e.releaseDate,
      language: e.language,
      link: e.link
    })), 1000)

    for (const values of productChunk) {
      await queryRunner.manager.createQueryBuilder()
        .insert()
        .into('product')
        .values(values)
        .execute()
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder()
      .delete()
      .from(Product, "product")
      .execute();
  }
}
