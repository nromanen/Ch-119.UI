import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
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
