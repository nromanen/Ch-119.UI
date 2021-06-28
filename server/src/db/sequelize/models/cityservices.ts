import { Model } from 'sequelize';
import { CITY_SERVICES } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class cityServices extends Model {
  }
  cityServices.init(
    {
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: CITY_SERVICES,
      underscored: true,
      timestamps: false,
    },
  );
  return cityServices;
};
