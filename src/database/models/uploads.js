'use strict';
module.exports = (sequelize, DataTypes) => {
  const Uploads = sequelize.define('Uploads', {
    post_id: DataTypes.INTEGER,
    upload_path: DataTypes.STRING
  }, {});
  Uploads.associate = function(models) {
    // associations can be defined here
  };
  return Uploads;
};