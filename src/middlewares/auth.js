const jwt = require('express-jwt');
const config = require('../config');

function getTokenFromHeader(req){
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

auth = {
    required: jwt({
        secret: config.secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    }),
//    ...optional auth options can be added here
};

module.exports = auth;