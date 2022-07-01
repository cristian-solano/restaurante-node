'use strict';

const { query } = require("express");

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('roles', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at"
    },
      updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at"
    }
    })
    await queryInterface.addConstraint(
      'roles', //nombre de la tabla
      {
        fields: ['id'],//columnas que tendran esta restriccion
        type: 'unique', //restriccion para que los valores sean unicos
        name: 'roles_pk' //nombre para guardar el cambio
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('roles')
  }
};
