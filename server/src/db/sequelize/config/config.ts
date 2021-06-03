require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
  },
  staging: {
    username: process.env.STAGING_DB_USERNAME,
    password: process.env.STAGING_DB_PASSWORD,
    database: process.env.STAGING_DB_DATABASE,
    host: process.env.STAGING_DB_HOST,
    port: process.env.STAGING_DB_PORT,
    dialect: process.env.STAGING_DB_CONNECTION,
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_DATABASE,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: process.env.PROD_DB_CONNECTION,
  },
};
