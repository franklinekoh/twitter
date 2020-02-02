'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    phone: DataTypes.STRING,
    username: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(value){
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    }
  }, {});

  User.prototype.generateJWT = function() {
    return jwt.sign({
      id: this.id,
      username: this.username,
      expiresIn: config.auth.exp
    }, config.secret);
  };

  User.prototype.toAuthJson = function() {
    return {
      token: this.generateJWT(),
      name: this.name,
      email: this.email,
      bio: this.bio,
      phone: this.phone,
      username: this.username
    };
  };

  User.prototype.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
  };

  User.isUniqueEmail = async function(email) {
      return await User.findOne({where: {email}}) === null;
  };

  User.isUniqueUsername = async function(username) {
      return await User.findOne({where: {username}}) === null;
  };

  User.isUniquePhone = async function(phone) {
     return await User.findOne({where: {phone}}) === null;
  };
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};