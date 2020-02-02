const {User} = require('../database/models/');

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

module.exports.login = async (req, res, next) => {
        try {
           const user = await User.findOne({where: {email: req.body.email}});
           if (!user) return res.status(401).json({'message': 'email/password incorrect'});

           if (!user.validatePassword(req.body.password)) res.status(401).json({'message': 'email/password incorrect'});

               res.status(200).json({user: user.toAuthJson()})
        }catch (e) {
            next(e);
        }
};

