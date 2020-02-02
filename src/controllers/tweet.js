const {Post, Uploads, Replies} = require('../database/models');

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
            })
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

        const reply = Replies.create({
            user_id: req.payload.id,
            post_id: req.body.post_id,
            body: req.body.body
        });
        req.files.map(async (value) => {
            await Uploads.create({
                'post_id': reply.id,
                'upload_path': 'uploads/posts/'+value.filename
            })
        });

        return res.status(201).json({'message': 'reply creation completed'});
    }catch (e) {
        next(e);
    }
};