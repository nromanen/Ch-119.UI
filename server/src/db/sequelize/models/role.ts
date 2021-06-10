import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Role.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true }, 
      name: { type: DataTypes.STRING, allowNull: true }
    },
    {
      sequelize,
      underscored: true,
      modelName: 'roles',
    },
  );

//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "driver"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });

  return Role
};

export const ROLES = ["user", "driver", "admin"];
