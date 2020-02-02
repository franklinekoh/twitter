const Joi = require('@hapi/joi');

const tweet = {
    post: Joi.object().keys({
        body: Joi.string().max(280)
    }),
    reply: Joi.object().keys({
        post_id: Joi.number().required(),
        body: Joi.string().max(280)
    })
};

module.exports = tweet;