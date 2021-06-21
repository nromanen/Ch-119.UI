import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class Role extends Model {
  }
  Role.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'roles',
    },
  );

  // Uncomment for creating tables in postgres
  // Role.create({
  //   id: 1,
  //   name: 'USER',
  // });

  // Role.create({
  //   id: 2,
  //   name: 'DRIVER',
  // });

  // Role.create({
  //   id: 3,
  //   name: 'ADMIN',
  // });

  return Role;
};


