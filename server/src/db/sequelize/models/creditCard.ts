import { Model } from 'sequelize';
import { CREDIT_CARD } from '../../../constants/modelsNames';

export default (sequelize: any, DataTypes: any) => {
  class CreditCard extends Model {
  }
  CreditCard.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date_of_expiration: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: CREDIT_CARD,
      underscored: true,
    },
  );
  return CreditCard;
};
