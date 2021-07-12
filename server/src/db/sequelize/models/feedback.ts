import { Model } from 'sequelize';
import {
  AUTHOR_ROLE_IN_FEEDBACK,
  SUBJECT_ROLE_IN_FEEDBACK,
} from '../../../constants/foreignKeys';
import { FEEDBACK } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class Feedback extends Model {
    static associate() {
      Feedback.belongsTo(sequelize.models.order);
      Feedback.belongsTo(sequelize.models.roles, {
        foreignKey: {
          name: AUTHOR_ROLE_IN_FEEDBACK,
        },
      });
      Feedback.belongsTo(sequelize.models.roles, {
        foreignKey: {
          name: SUBJECT_ROLE_IN_FEEDBACK,
        },
      });
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
    },
    {
      sequelize,
      modelName: FEEDBACK,
      underscored: true,
    },
  );
  return Feedback;
};
