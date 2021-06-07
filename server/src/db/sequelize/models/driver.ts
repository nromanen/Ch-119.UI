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
      
    }
  }
  Driver.init(
    {
      car_color: DataTypes.STRING,
      car_model: DataTypes.STRING,
      car_number: { type: DataTypes.STRING, unique:true},
      driver_rating:DataTypes.INTEGER,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Driver',
    },
  );

  return Driver;
};