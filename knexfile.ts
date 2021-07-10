// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "recipes",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    migrations: {
      directory: "./db/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./db/seeds",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: {
      database: "recipes_prod",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
