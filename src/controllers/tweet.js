const {Post, Uploads, Replies, User} = require('../database/models');
const { Op } = require('sequelize');

/**
 * post tweet endpoint
 * 
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
module.exports.post = async (req, res, next) => {
    try {
        if (!req.body.body && req.files.length === 0)
            return res.status(400).json({'message': 'bad request: body or photos is required'});

        const post = await Post.create({
            user_id: req.payload.id,
            body: req.body.body
        });
        req.files.map(async (value) => {
            await Uploads.create({
                post_id: post.id,
                upload_path: 'uploads/posts/'+value.filename
            });
        });

        return res.status(201).json({'message': 'post creation completed'});
    }catch (e) {
        next(e);
    }

};

/**
 * Reply tweet endpoint
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
module.exports.reply = async (req, res, next) => {
    try {
        if (!req.body.post_id)
            return res.status(422).json({'message': 'post_id is required'});

        const post = await Post.create({ //create a new post. a reply is also a post on twitter
            user_id: req.payload.id,
            body: req.body.body
        });

        const reply = await Replies.create({
            user_id: req.payload.id,
            post_id: req.body.post_id,
            body: req.body.body
        });

        req.files.map(async (value) => {
            await Uploads.create({ // ...because a reply is a post
                'post_id': post.id,
                'upload_path': 'uploads/posts/'+value.filename
            });

            await Uploads.create({
                'post_id': reply.id,
                'upload_path': 'uploads/posts/'+value.filename
            });
        });

        return res.status(201).json({'message': 'reply creation completed'});
    }catch (e) {
        next(e);
    }
};

module.exports.search = async (req, res, next) => {
        try {
            const q = req.query.q;
            const type = req.query.type; //twitter ui separates search result into different categories. I felt it was ok
            // separate this search into two cat. users and tweets


            if (type === 'users') {
             var data = await User.findAll({
                 where: {
                   [Op.or]: {
                       username: {
                           [Op.like]: `%${q}%`
                       },
                       name: {
                           [Op.like]: `%${q}%`
                       }
                   }
                 },
                 order: [
                     ['createdAt', 'DESC']
                 ]
             });
            }
            
            if (type === 'tweets') {
                data = await Post.findAll({
                    where: {
                        body: {
                            [Op.like]: `%${q}%`
                        }
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
            }

            return res.json(data);
        }catch (e) {
            next(e);
        }
};