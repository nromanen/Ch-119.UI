import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
