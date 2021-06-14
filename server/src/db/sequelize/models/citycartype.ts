import { Model } from 'sequelize';
import { CITY_CAR_TYPES } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class cityCarType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  cityCarType.init(
    {
      coef: {
        type: DataTypes.FLOAT(11),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: CITY_CAR_TYPES,
      underscored: true,
    },
  );
  return cityCarType;
};
