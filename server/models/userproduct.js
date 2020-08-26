'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProduct extends Model {
    static associate(models) {
      UserProduct.belongsTo(models.User)
      UserProduct.belongsTo(models.Product)
    }
  };
  UserProduct.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    favorite: DataTypes.BOOLEAN,
    history: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'UserProduct',
  });
  return UserProduct;
};