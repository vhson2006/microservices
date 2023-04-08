import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CagtegoriesGenerator1675059175844 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'section',
            type: 'varchar',
          },
          {
            name: 'pacset',
            type: 'varchar',
          },
          {
            name: 'language',
            type: 'varchar',
          },
          {
            name: 'link',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'integer',
            default: 1,
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
      'categories',
      new TableIndex({
        name: 'IDX_CATEGORY_NAME',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('categories', 'IDX_CATEGORY_NAME');
    await queryRunner.dropTable('categories');
  }

}
