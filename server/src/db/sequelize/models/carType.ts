import { Model } from 'sequelize';
import {
  ORDER,
  CAR_TYPE,
  CITY,
  CITY_CAR_TYPES,
} from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class CarType extends Model {
    static associate(models: any) {
      CarType.belongsToMany(models[CITY], {
        through: models[CITY_CAR_TYPES],
      });
      CarType.hasMany(models[ORDER]);
    }
  }
  CarType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: CAR_TYPE,
      underscored: true,
      timestamps: false,
    },
  );
  return CarType;
};
