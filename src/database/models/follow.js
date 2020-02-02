'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    follower_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    followed_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
  };
  return Follow;
};