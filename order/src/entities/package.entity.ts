import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('package')
export class Package {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public orderId: string;

  @Column()
  public userId: string;

  @Column()
  public total: string;

  @Column()
  public trackCode: string;

  @Column()
  public firstmileStatus: string;

  @Column()
  public lastmileStatus: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
