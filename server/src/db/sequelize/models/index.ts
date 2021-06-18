import * as fs from 'fs';
import * as path from 'path';
import { DataTypes } from 'sequelize';
import { DEVELOPMENT } from '../../../constants/env';

const Sequelize = require('sequelize');

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
      // eslint-disable-next-line global-require

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

db.user = sequelize.models['users'];
db.role = sequelize.models['roles'];
db.token = sequelize.models['tokens'];

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

export default sequelize;
