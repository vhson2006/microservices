import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column()
  public phone: string;

  @Column()
  public address: string;

  @Column({ nullable: true })
  public forgotToken: string;

  @Column({ nullable: true })
  public resetToken: string;

  @Column({ default: 0 })
  public webSession: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
