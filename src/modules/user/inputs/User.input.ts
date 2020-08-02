import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";

@InputType()
export class UserInput {
  @Field()
  @Length(2, 20)
  firstName: string;

  @Field()
  @Length(2, 30)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(8, 16)
  password: string;
}
