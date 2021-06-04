import { Sequelize } from 'sequelize';
import { DEVELOPMENT } from '../../../constants/env';

const env = process.env.NODE_ENV || DEVELOPMENT;
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
