'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Uploads', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      post_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        unique: true
      },
      upload_path: {
        type: Sequelize.STRING(2048)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint(
        'Uploads',
        ['post_id'],
        {
          type: 'foreign key',
          name: 'post_id_fk',
          references: {
            table: 'Posts',
            field: 'id'
          }
        }
    ));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Uploads');
  }
};