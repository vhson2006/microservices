import { readFile } from "fs/promises";
import { Card } from "src/entities/card.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class CardSeeder1676614564047 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const {card} = JSON.parse(await readFile("src/migrations/data/card.json", "utf8"));
    const sliceIntoChunks = (arr, chunkSize) => {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
          const chunk = arr.slice(i, i + chunkSize);
          res.push(chunk);
      }
      return res;
    }
    const cardChunk = sliceIntoChunks(card.map((e: any) => ({
      name: e.name,
      text: e.text,
      attribute: e.attribute,
      level: e.level,
      atk: e.atk,
      def: e.def,
      type: e.type,
      image: e.image,
      language: e.language,
      link: e.link,
      status: e.status
    })), 1000)

    for (const values of cardChunk) {
      await queryRunner.manager.createQueryBuilder()
        .insert()
        .into('card')
        .values(values)
        .execute()
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection.createQueryBuilder()
      .delete()
      .from(Card, "card")
      .execute();
  }
}
