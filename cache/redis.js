const redis = require('redis');

const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    var client = redis.createClient();
}else {
    client = redis.createClient(process.env.REDIS_URL);
}

module.exports = client;
