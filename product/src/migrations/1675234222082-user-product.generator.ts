import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserProductGenerator1672902085443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user-product',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'varchar',
          },
          {
            name: 'userName',
            type: 'varchar',
          },
          {
            name: 'cardId',
            type: 'varchar',
          },
          {
            name: 'productId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'integer',
            default: 0,
          },
          {
            name: 'price',
            type: 'varchar',
          },
          {
            name: 'trackCode',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user-product');
  }
}
