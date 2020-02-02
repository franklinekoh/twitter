const { Follow, Post, Uploads } = require('../database/models');
const { Op } = require('sequelize');
const util = require('../utils');

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

       return  res.json(post);
    }catch (e) {
        next(e);
    }
};