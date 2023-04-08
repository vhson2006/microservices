import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class AccountGenerator1616967532973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'forgotToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'resetToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'webSession',
            type: 'int',
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

    await queryRunner.createIndex(
      'account',
      new TableIndex({
        name: 'IDX_ACCOUNT_USERNAME',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('account', 'IDX_ACCOUNT_USERNAME');
    await queryRunner.dropTable('account');
  }
}
