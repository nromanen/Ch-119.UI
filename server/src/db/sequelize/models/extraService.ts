import { Model } from 'sequelize';
import { extraService } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class ExtraService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
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
      },
    },
    {
      sequelize,
      modelName: extraService,
    },
  );
  return ExtraService;
};
