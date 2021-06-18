import { Model } from 'sequelize';
import { CITY_SERVICES } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class cityServices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
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
