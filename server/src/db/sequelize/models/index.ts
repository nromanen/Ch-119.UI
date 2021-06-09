/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import * as fs from 'fs';
import * as path from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { DEVELOPMENT } from '../../../constants/env';

const env = process.env.NODE_ENV || DEVELOPMENT;
const config = require('../config/config')[env];

const basename = path.basename(__filename);
const db: any = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    logQueryParameters: true,
  },
);

fs.readdirSync(__dirname)
  .filter(
    (file: any) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts',
  )
  .forEach((file: any) => {
    try {
      const model = require(path.join(__dirname, file)).default(
        sequelize,
        DataTypes,
      );
      db[model.name] = model;
    } catch (error) {
      console.error(error);
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default sequelize;
