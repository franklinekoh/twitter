const Joi = require('@hapi/joi');

const tweet = {
    search: Joi.object().keys({
        q: Joi.string().required(),
        type: Joi.any().valid('users', 'tweets').required()
    })
};

module.exports = tweet;