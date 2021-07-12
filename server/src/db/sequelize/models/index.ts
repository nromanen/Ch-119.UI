/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import * as fs from 'fs';
import * as path from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { DEVELOPMENT } from '../../../constants/env';
import { USER, TOKEN, ROLE, ORDER } from '../../../constants/modelsNames';

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || DEVELOPMENT;
const config = require('../config/config')[env];

const db: any = {};

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

db.user = sequelize.models[USER];
db.role = sequelize.models[ROLE];
db.token = sequelize.models[TOKEN];

db.token.belongsTo(db.user);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = sequelize.models.users;
db.role = sequelize.models.roles;
db.token = sequelize.models.tokens;

db.token.belongsTo(db.user);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

export const ROLES = ['user', 'driver', 'admin'];

export default sequelize;
