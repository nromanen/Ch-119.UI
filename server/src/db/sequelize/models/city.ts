import { Model } from 'sequelize';
import {
  CAR_TYPE,
  CITY,
  CITY_CAR_TYPES,
  EXTRA_SERVICE,
  CITY_SERVICES,
} from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class City extends Model {
    static associate(models: any) {
      City.belongsToMany(models[CAR_TYPE], {
        through: models[CITY_CAR_TYPES],
      });
      City.belongsToMany(models[EXTRA_SERVICE], {
        through: CITY_SERVICES,
      });
    }
  }
  City.init(
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
      basePrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      basePriceForKm: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: CITY,
      underscored: true,
      // hooks: {},
      timestamps: false,
    },
  );

  return City;
};
