import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class NewsGenerator1672639121752 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'news',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'content',
            type: 'varchar',
          },
          {
            name: 'author',
            type: 'varchar',
          },
          {
            name: 'authorAvatar',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'source',
            type: 'varchar',
          },
          {
            name: 'publishDate',
            type: 'timestamptz',
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
      'news',
      new TableIndex({
        name: 'IDX_NEWS_TITLE',
        columnNames: ['title'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('news', 'IDX_NEWS_TITLE');
    await queryRunner.dropTable('news');
  }
}
