import { Model } from 'sequelize';
import { FEEDBACK } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      Feedback.belongsTo(sequelize.models.order);
    }
  }
  Feedback.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING(1000),
      },
      rating: {
        type: DataTypes.DECIMAL(10, 1),
      },
      author_id: {
        type: DataTypes.INTEGER,
      },
      subject_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: FEEDBACK,
      underscored: true,
    },
  );
  return Feedback;
};
