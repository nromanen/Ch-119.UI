import { Model } from 'sequelize';
import {
  CITY,
  CITY_SERVICES,
  EXTRA_SERVICE,
} from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class ExtraService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      ExtraService.belongsToMany(models[CITY], {
        through: CITY_SERVICES,
      });
    }
  }
  ExtraService.init(
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
      modelName: EXTRA_SERVICE,
      underscored: true,
    },
  );
  return ExtraService;
};
