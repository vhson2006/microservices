import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public packageId: string;

  @Column()
  public userProductId: string;

  @Column()
  public cardName: string;

  @Column()
  public image: string;

  @Column()
  public code: string;

  @Column()
  public rarity: string;

  @Column()
  public releaseDate: string;

  @Column()
  public box: string;

  @Column()
  public price: string;

  @Column()
  public quantity: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
