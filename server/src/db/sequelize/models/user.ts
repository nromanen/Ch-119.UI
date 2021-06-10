import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      
      const db: any = {};
      db.user = sequelize.models['users'];
      db.role = sequelize.models['roles'];

      db.role.belongsToMany(db.user, {
        through: "user_roles",
        foreignKey: "roleId",
        otherKey: "userId"
      });

      db.user.belongsToMany(db.role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId"
      });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      trips_num: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'users',
    }
  );

  return User;
};
