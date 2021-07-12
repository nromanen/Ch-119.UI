import { Model } from 'sequelize';
import { CITY_CAR_TYPES } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class cityCarType extends Model {
    static associate(models: any) {
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
      timestamps: false,
    },
  );
  return cityCarType;
};
