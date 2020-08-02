import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  productName: string;

  @Field()
  @Column()
  productDescription: string;

  @Field()
  @Column()
  pricing: number;

  @Column("bool", { default: true })
  status: boolean;
}
