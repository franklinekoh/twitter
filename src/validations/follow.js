const Joi = require('@hapi/joi');

const follow = {
    create: Joi.object().keys({
        followed_id: Joi.number().integer().positive().required()
    })
};

module.exports = follow;