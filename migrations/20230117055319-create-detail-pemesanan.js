'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_pemesanans', {
      id_detail_pemesanan:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_akses: {
        type: Sequelize.DATE
      },
      harga: {
        type: Sequelize.INTEGER
      },
      id_pemesanan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "pemesanans",
          key: "id_pemesanan",
        }
      },
      id_kamar: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "kamars",
          key: "id_kamar",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_pemesanans');
  }
};