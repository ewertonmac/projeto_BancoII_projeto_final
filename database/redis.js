const redis = require('redis');
let RedisStore = require("connect-redis");
require('dotenv').config();

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    legacyMode: true
});

redisClient.connect().catch(console.error)

module.exports = redisClient;


