import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";
import { UserRegisterResolver } from "./modules/user/resolvers/User";
import { ProductRegisterResolver } from "./modules/product/resolvers/Product";

const main = async () => {
  await createConnection();
  const schema = await buildSchema({
    resolvers: [UserRegisterResolver, ProductRegisterResolver],
  });

  // Definition on the ApolloServer
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  });
  // Definition on a Express Node Server
  const app = Express();

  // Definition for the frontend client
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  // Definition to use the Apollo Server and the playground
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("Server running! On http://localhost:4000/graphql");
  });
};

main();
