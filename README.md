# GraphQL + Apollo Starter 🛠

Get an GraphQL server using TypeGraphQL and PostgreSQL up and running in seconds.

## Installation 🚀

### Pre-requisites

1. Yarn v.1.22.4+.

2. PostgreSQL v.12.

### Steps ✅

1. Clone this repository.

2. Run ``yarn install`` on your terminal to get all the dependencies.

3. Get your PostgreSQL services up and running but it's not mandatory to use PgSQL.

4. Check the ``ormconfig.json`` file:

```json
    {
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "<your-username>",
  "password": "<your-password>",
  "database": "<your-database-name>",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entity/*.*"]
}
```

- Keep in mind:
    - Change the values in ``<>``.
    - If you want to experiment and use another database, I would suggest checking [TypeORM Documentation](https://typeorm.io/#/), and switching some configs out.

5. Run the development server using: ``yarn start``.

6. Apollo server must be listening on: ``http://localhost:4000/graphql``.

7. Everything is setup so far, happy coding 😉.

## License

[MIT](https://opensource.org/licenses/MIT)