const { Follow } = require('../database/models');
module.exports.create = async (req, res, next) => {
    try {
        if (req.body.followed_id === req.payload.id)
            return res.status(403).json({'message': 'Unauthorized: cannot follow self'});

        await Follow.create({
            follower_id: req.payload.id,
            followed_id: req.body.followed_id
        });

        return res.status(201).json({'message': 'follow successful'});
    }catch (e) {
        next(e);
    }
};