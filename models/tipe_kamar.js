'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipe_kamar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pemesanan, {
        FOREIGNKEY:'id', as: 'pemesanan'
      })  
      this.hasMany(models.kamar, {
        FOREIGNKEY:'id', as: 'kamar'
      })
    }
  }
  tipe_kamar.init({
    id_tipe_kamar:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    }, 
    nama_tipe_kamar: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipe_kamar',
  });
  return tipe_kamar;
};