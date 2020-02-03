const redis = require('redis');
const config = require('../src/config');

const client = redis.createClient({
    expiredAt: config.redis.exp
});
module.exports = client;
