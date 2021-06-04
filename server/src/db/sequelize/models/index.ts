import { Sequelize } from 'sequelize';
import { DEVELOPMENT } from '../../../constants/env';

const env = process.env.NODE_ENV || DEVELOPMENT;
const config = require('../config/config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
    host: config.host,
    logQueryParameters: true,
  },
);

export default sequelize;
