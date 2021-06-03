import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    ...config,
    logQueryParameters: true,
  },
);

export default sequelize;
