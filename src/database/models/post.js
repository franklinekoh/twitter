'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    user_id: DataTypes.INTEGER,
    body: DataTypes.TEXT,
    upload_path: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.hasMany(models.Uploads, {
      foreignKey: 'post_id',
      as: 'uploads'
    })
  };
  return Post;
};