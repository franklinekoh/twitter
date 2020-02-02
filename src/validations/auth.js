const Joi = require('@hapi/joi');

const auth = {
    register: Joi.object().keys({
        name: Joi.string().required().max(50),
        email: Joi.string().email().required(),
        bio: Joi.string().max(160),
        phone: Joi.string().min(9), //assuming that the length is dynamic. gotten from country code.
        username: Joi.string().min(3).max(30),
        password: Joi.string().required()
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'))
            .message('"password" must be 8 characters long, and must contain at least 1 lowercase, 1 uppercase and 1 numeric character')
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};

module.exports = auth;