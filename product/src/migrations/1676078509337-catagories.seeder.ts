import { readFile } from 'fs/promises';
import { Categories } from 'src/entities/category.entity';
import { MigrationInterface, QueryRunner } from "typeorm";

export class CatagoriesSeeder1676078509337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const {categories} = JSON.parse(await readFile("src/migrations/data/categories.json", "utf8"));
    const sliceIntoChunks = (arr, chunkSize) => {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
      }
      return res;
    }
    const categoriesChunk = sliceIntoChunks(categories.map((e: any) => ({
      name: e.name,
      section: e.section,
      pacset: e.pacset,
      language: e.language,
      link: e.link,
      status: e.status
    })), 1000)

    for (const values of categoriesChunk) {
      await queryRunner.manager.createQueryBuilder()
        .insert()
        .into('categories')
        .values(values)
        .execute()
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder()
      .delete()
      .from(Categories, "categories")
      .execute();
  }
}

