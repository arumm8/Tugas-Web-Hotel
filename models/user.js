'use strict';
const {
  Model
} = require('sequelize');
//const { FOREIGNKEYS } = require('sequelize/types/query-types');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    
    static associate(models) {
      this.hasMany(models.pemesanan, {
        FOREIGNKEY:'id', as: 'pemesanan'
      })    
    }
  }
  user.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    nama_user: DataTypes.STRING,
    foto_user: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'resepsionis')
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};