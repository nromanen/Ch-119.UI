import { Model } from 'sequelize';

import {
  CAR_TYPE,
  DRIVER,
  FEEDBACK,
  ORDER,
  USER,
} from '../../../constants/modelsNames';
import { USER_IN_ORDER } from '../../../constants/foreignKeys';

export default (sequelize: any, DataTypes: any) => {
  class Order extends Model {
    static associate(models: any) {
      Order.belongsTo(models[USER], {
        foreignKey: {
          name: USER_IN_ORDER,
        },
      });
      Order.hasMany(models[FEEDBACK]);
      Order.belongsTo(models[DRIVER]);
      Order.belongsTo(models[CAR_TYPE], {
        foreignKey: {
          name: 'car_type_id',
        },
      });
      Order.hasMany(models[FEEDBACK]);
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
