import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column()
  public author: string;

  @Column()
  public authorAvatar: string;

  @Column()
  public image: string;

  @Column()
  public source: string;

  @Column()
  public publishDate: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
