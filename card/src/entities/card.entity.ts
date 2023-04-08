import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public text: string;

  @Column()
  public attribute: string;

  @Column()
  public level: string;

  @Column()
  public atk: string;

  @Column()
  public def: string;

  @Column()
  public type: string;

  @Column()
  public extraType: string;

  @Column()
  public mainType: string;

  @Column()
  public image: string;

  @Column()
  public language: string;

  @Column()
  public link: string;

  @Column()
  public pediaLink: string;

  @Column()
  public status: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt?: Date;
}
