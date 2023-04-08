import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('user-product')
export class UserProduct {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public userId: string;

  @Column()
  public userName: string;

  @Column()
  public cardId: string;

  @Column()
  public productId: string;

  @Column()
  public quantity: string;

  @Column()
  public price: string;

  @Column({ nullable: true })
  public trackCode: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
