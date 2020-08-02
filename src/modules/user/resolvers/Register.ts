import { Resolver, Mutation, Arg, Query } from "type-graphql";
import * as bcrypt from "bcrypt";
import { User } from "../../../entity/User";
import { UserInput } from "../inputs/User.input";

@Resolver()
export class RegisterResolver {
  @Query(() => String, { name: "hello" })
  async hello() {
    return "Hello world";
  }
  @Mutation(() => User) async register(
    @Arg("inputs") { email, firstName, lastName, password }: UserInput
  ): Promise<User> {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    }).save();
    return user;
  }
}
