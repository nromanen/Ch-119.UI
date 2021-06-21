import { Model } from 'sequelize';

export default (sequelize: any, DataTypes: any) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
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
