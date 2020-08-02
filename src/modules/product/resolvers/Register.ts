import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { ProductInput } from "../inputs/Product.input";
import { Product } from "../../../entity/Product";

@Resolver()
export class ProductRegisterResolver {
  @Query(() => String, { name: "hello" })
  async hello() {
    return "Hello world";
  }

  @Mutation(() => Product) async productRegister(
    @Arg("inputs") { productName, productDescription, pricing }: ProductInput
  ): Promise<Product> {
    const product = await Product.create({
      productName,
      productDescription,
      pricing,
    }).save();
    return product;
  }
}
