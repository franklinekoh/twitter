'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Replies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED
      },
      body: {
        type: Sequelize.TEXT
      },
      upload_path: {
        type: Sequelize.STRING
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
        'Replies',
        ['post_id'],
        {
          type: 'foreign key',
          name: 'post_replies_id_fk',
          references: {
            table: 'Posts',
            field: 'id'
          }
        }
    )).then(() => queryInterface.addConstraint(
        'Replies',
        ['user_id'],
        {
          type: 'foreign key',
          name: 'user_replies_id_fk',
          references: {
            table: 'Users',
            field: 'id'
          }
        }
    ));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Replies');
  }
};