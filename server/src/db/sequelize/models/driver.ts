import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class Driver extends Model {
    static associate() {
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
