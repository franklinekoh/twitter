'use strict';
module.exports = (sequelize, DataTypes) => {
  const Replies = sequelize.define('Replies', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    upload_path: DataTypes.STRING
  }, {});
  Replies.associate = function(models) {
    // associations can be defined here
  };
  return Replies;
};