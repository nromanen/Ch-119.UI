import { Model } from 'sequelize';
import { ORDER } from '../../../constants/modelsNames';
import { USER_IN_ORDER } from '../../../constants/foreignKeys';

export default (sequelize: any, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      User.hasMany(models[ORDER], {
        foreignKey: {
          name: USER_IN_ORDER,
        },
      });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: true },
      phone: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      trips_num: { type: DataTypes.INTEGER, allowNull: true },
      verification_code: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'users',
    },
  );

  return User;
};
