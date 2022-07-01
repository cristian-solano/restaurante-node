'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('customer-details', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      st_customer_id: {
        type: DataTypes.UUID,
        allowNull: true
      },
      st_default_payment_method_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      default_address_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'customer_addresses',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }),
      await queryInterface.addConstraint('customer-details', {
        fields: ['id'],
        type: 'unique',
        name: 'customer_details_id_unique',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('customer-details')
  }
  
};
