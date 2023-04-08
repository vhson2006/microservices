import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class ProductGenerator1675234202082 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'language',
            type: 'varchar',
          },
          {
            name: 'link',
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
            name: 'box',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'releaseDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'originBox',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'jsonPrice',
            type: 'json',
            isNullable: true,
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

    await queryRunner.createIndex(
      'product',
      new TableIndex({
        name: 'IDX_PRODUCT_CODE',
        columnNames: ['code'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('product', 'IDX_PRODUCT_CODE');
    await queryRunner.dropTable('product');
  }

}
