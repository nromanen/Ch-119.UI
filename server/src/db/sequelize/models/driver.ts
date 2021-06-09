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
      // Driver.hasOne(sequelize.models['User'])
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
