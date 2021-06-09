import { Model } from 'sequelize';
import { carTypes } from '../../../constants/seeders';
import {
  CAR_TYPE,
  CITY,
  CITY_CAR_TYPES,
  EXTRA_SERVICE,
  CITY_SERVICES,
} from '../../../constants/modelsNames';
import { extraServices } from '../../../constants/seeders';

export default (sequelize: any, DataTypes: any) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // City.hasMany(models[CAR_TYPE]);
      City.belongsToMany(models[CAR_TYPE], {
        through: CITY_CAR_TYPES,
      });
      City.belongsToMany(models[EXTRA_SERVICE], {
        through: CITY_SERVICES,
      });
      // define association here

      // await City.create(
      //   {
      //     name: 'Чернівці',
      //     basePrice: 40,
      //     basePriceForKm: 10,
      //     car_types: carTypes.slice(0, 4),
      //   },
      //   {
      //     include: [sequelize.models.car_type],
      //   },
      // );
      // console.log('City created');
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
      hooks: {},
    },
  );

  return City;
};
