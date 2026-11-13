import "reflect-metadata";
import { readFileSync } from "fs";
import { join } from "path";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import cors from "cors";
import { UserRegisterResolver } from "./modules/user/resolvers/User";
import { ProductRegisterResolver } from "./modules/product/resolvers/Product";
import { User } from "./entity/User";
import { Product } from "./entity/Product";
import { Purchased } from "./entity/Purchased";

type PostgresOrmConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
};

const main = async () => {
  const ormconfig = JSON.parse(
    readFileSync(join(__dirname, "../ormconfig.json"), "utf8")
  ) as PostgresOrmConfig;

  // TypeORM 0.3 removed createConnection() and the automatic ormconfig load.
  // Entity classes are passed directly so Active Record (BaseEntity.create/save)
  // uses the same class instances the resolvers import.
  const dataSource = new DataSource({
    type: "postgres",
    host: ormconfig.host,
    port: ormconfig.port,
    username: ormconfig.username,
    password: ormconfig.password,
    database: ormconfig.database,
    synchronize: ormconfig.synchronize,
    logging: ormconfig.logging,
    entities: [User, Product, Purchased],
  });
  await dataSource.initialize();

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
