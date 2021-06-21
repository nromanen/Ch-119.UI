import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class Token extends Model {
  }
  Token.init(
    {
      refreshToken: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      underscored: true,
      modelName: 'tokens',
    },
  );

  return Token;
};
