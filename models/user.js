'use strict';
const {
  Model
} = require('sequelize');
//const { FOREIGNKEYS } = require('sequelize/types/query-types');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    
    static associate(models) {
      this.hasMany(models.pemesanan, {
        FOREIGNKEY:'id_user', as: 'pemesanan'
      })    
    }
  }
  user.init({
    id_user: DataTypes.INTEGER,
    nama_user: DataTypes.STRING,
    foto: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'resepsionis')
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};