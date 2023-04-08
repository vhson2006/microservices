import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;
  
  @Column()
  public address: string;
  
  @Column()
  public phone: string;

  @Column()
  public total: string;

  @Column()
  public customerStatus: string;

  @Column()
  public paymentStatus: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
