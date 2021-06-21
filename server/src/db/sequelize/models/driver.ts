import { Model } from 'sequelize';
import { ORDER } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      // sequelize.models['users'].belongsTo(Driver)
      Driver.hasMany(models[ORDER], {
        foreignKey: {
          name: 'driver_id',
        },
      });
    }
  }
  Driver.init(
    {
      car_color: DataTypes.STRING,
      car_model: DataTypes.STRING,
      car_number: { type: DataTypes.STRING, unique: true },
      driver_rating: DataTypes.INTEGER,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'drivers',
    },
  );

  return Driver;
};
