const Joi = require('@hapi/joi');

const auth = {
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')).message('"password" must be 8 characters long, and must contain at least 1 lowercase, 1 uppercase and 1 numeric character')
    })
};

module.exports = auth;