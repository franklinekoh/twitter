const { Follow, Post, Uploads } = require('../database/models');
const { Op } = require('sequelize');
const util = require('../utils');
const redisClient = require('../../cache/redis');
const config = require('../config');

/**
 * get user timeline
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
module.exports.get = async (req, res, next) => {
    try {

        redisClient.get(config.redis.keys.getTimeline+':'+req.payload.id, async (err, data) => {
            if (!data) {
                const follow = await Follow.findAll({attributes: ['followed_id'], where: {
                        follower_id: req.payload.id
                    }});

                let followedId = [];
                follow.map((value) => {
                    followedId.push(value.followed_id); //get followed ids and use to get their post to display
                });
                followedId.push(req.payload.id); //also pass users id into array since user sees
                // their posts own on their timeline too. other algorithms In my opinion, e.g "like" can also be
                // implemented using this concept

                const post = await Post.findAll(util.paginate({where: {
                        user_id: {
                            [Op.in]: followedId
                        }
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    include: [{
                        model: Uploads,
                        as: 'uploads'
                    }]
                }, parseInt(req.query.page) || 1, parseInt(req.query.size) || 100));
                
                redisClient.set(config.redis.keys.getTimeline +':'+req.payload.id, JSON.stringify(post), 'EX', config.redis.exp);
                return  res.json({data: post});
            }else {
                return  res.json({data: JSON.parse(data)});
            }

        });

    }catch (e) {
        next(e);
    }
};