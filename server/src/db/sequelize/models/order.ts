import { Model } from 'sequelize';
import { ORDER } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      // create associate with user and driver(id for user and id for driver from driver)
      // order.hasOne(carType)
      // carType.belongsTo(Order)
      // order.hasMany(extraServices)
      // extraServices.belongsToMany(Order)
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      driver_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      car_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      extra_services: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      isCard: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: ORDER,
      underscored: true,
      timestamps: true,
    },
  );
  return Order;
};
