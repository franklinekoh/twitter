const {User} = require('../database/models/');
const { Op } = require('sequelize');

/**
 * Registration endpoint
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
module.exports.register = async (req, res, next) => {
        try {
           const isUniqueEmail = await User.isUniqueEmail(req.body.email);
            if (!isUniqueEmail) return  res.status(422).json({'message': 'email already exists'});

            const isUniquePhone = await User.isUniquePhone(req.body.phone);
            if (!isUniquePhone) return  res.status(422).json({'message': 'phone already exists'});

            const isUniqueUsername = await User.isUniqueUsername(req.body.username);
            if (!isUniqueUsername) return  res.status(422).json({'message': 'username already exists'});

             const user = await User.create(req.body);
            return res.status(201).json({user: user.toAuthJson()});
        }catch (e) {
            next(e);
        }
};

/**
 * Login endpoint
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|Json|Promise<any>>}
 */
module.exports.login = async (req, res, next) => {
        try {
            const user_id = req.body.user_id;
            const password = req.body.password;
           const user = await User.findOne({
               where: {
                   [Op.or]: {
                       email: user_id,
                       username: user_id,
                       phone: user_id
                   }
               }
           });
           if (!user) return res.status(401).json({'message': 'incorrect credentials'});

           if (!user.validatePassword(password))
               res.status(401).json({'message': 'incorrect credentials'});

               res.json({user: user.toAuthJson()});
        }catch (e) {
            next(e);
        }
};

