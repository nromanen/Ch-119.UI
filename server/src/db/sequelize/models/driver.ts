import { Model } from 'sequelize';
import { ORDER } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class Driver extends Model {
    static associate(models: any) {
      Driver.hasMany(models[ORDER], {
        foreignKey: {
          name: 'driver_id',
        },
      });
      Driver.belongsTo(sequelize.models.users);
    }
  }
  Driver.init(
    {
      car_color: DataTypes.STRING,
      car_model: DataTypes.STRING,
      car_number: { type: DataTypes.STRING, unique: true },
      driver_rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      underscored: true,
      modelName: 'drivers',
    },
  );

  return Driver;
};
