import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CardGenerator1675079111624 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card',
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
            name: 'text',
            type: 'varchar',
          },
          {
            name: 'attribute',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'level',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'atk',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'def',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mainType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'extraType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
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
            name: 'pediaLink',
            type: 'varchar',
            isNullable: true,
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
      'card',
      new TableIndex({
        name: 'IDX_CARD_NAME',
        columnNames: ['name'],
      }),
    );
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('card', 'IDX_CARD_NAME');
    await queryRunner.dropTable('card');
  }

}
