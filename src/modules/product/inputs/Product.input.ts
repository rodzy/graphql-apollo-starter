import { InputType, Field } from "type-graphql";
import { Length, IsNumber } from "class-validator";

@InputType()
export class ProductInput {
  @Field()
  @Length(2, 20)
  productName: string;

  @Field()
  @Length(2, 30)
  productDescription: string;

  @Field()
  @IsNumber()
  pricing: number;

}
