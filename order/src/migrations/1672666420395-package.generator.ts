import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class PackageGenerator1672666420395 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'package',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'orderId',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'varchar',
          },
          {
            name: 'total',
            type: 'varchar',
          },
          {
            name: 'trackCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'firstmileStatus',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'lastmileStatus',
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

    await queryRunner.createIndex(
      'package',
      new TableIndex({
        name: 'IDX_PACKAGE_TRACKCODE',
        columnNames: ['trackCode'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('package', 'IDX_PACKAGE_TRACKCODE');
    await queryRunner.dropTable('package');
  }
}
