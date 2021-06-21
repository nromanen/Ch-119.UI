import { Model } from 'sequelize';
import { FEEDBACK } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class Feedback extends Model {
    static associate() {
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
