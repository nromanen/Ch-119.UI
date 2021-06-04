import { Sequelize } from 'sequelize';
import * as appConstants from '../../../constants/app';

const env = process.env.NODE_ENV || appConstants.DEVELOPMENT;
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
