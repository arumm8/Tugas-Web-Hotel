'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {

    static associate(models) {
      this.belongsTo(models.user)
      this.belongsTo(models.tipe_kamar)
      this.hasMany(models.detail_pemesanan, {
        FOREIGNKEY:'id_detail_pemesanan', as: 'detail_pemesanan'
      }) 
    }
  }
  pemesanan.init({
    id_pemesanan:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, 
    nomor_pemesanan: DataTypes.INTEGER,
    nama_pemesan: DataTypes.STRING,
    email_pemesan: DataTypes.STRING,
    tgl_pemesanan: DataTypes.DATE,
    tgl_check_in: DataTypes.DATE,
    tgl_check_out: DataTypes.DATE,
    nama_tamu: DataTypes.STRING,
    jumlah_kamar: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    status_pemesanan: DataTypes.ENUM('baru','check_in','check_out'),
    id_tipe_kamar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pemesanan',
  });
  return pemesanan;
};