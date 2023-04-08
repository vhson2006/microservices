import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public language: string;

  @Column()
  public link: string;

  @Column()
  public code: string;

  @Column()
  public rarity: string;

  @Column()
  public box: string;

  @Column()
  public releaseDate: string;

  @Column()
  public originBox: string;

  @Column()
  public image: string;

  @Column()
  public jsonPrice: string;
  
  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}

