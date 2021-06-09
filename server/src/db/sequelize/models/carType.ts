import { Model } from 'sequelize';
import { CAR_TYPE, CITY, CITY_CAR_TYPES } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class CarType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      // CarType.hasMany(models[CITY]);
      CarType.belongsToMany(models[CITY], {
        through: CITY_CAR_TYPES,
      });
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
    },
  );
  return CarType;
};
