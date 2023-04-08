import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class ItemGenerator1672666426459 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'packageId',
            type: 'varchar',
          },
          {
            name: 'userProductId',
            type: 'varchar',
          },
          {
            name: 'cardName',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'rarity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'releaseDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'box',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'varchar',
          },
          {
            name: 'quantity',
            type: 'integer',
            default: 0,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item');
  }
}
