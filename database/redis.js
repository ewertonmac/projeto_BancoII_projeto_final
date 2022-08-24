const redis = require('redis');
let RedisStore = require("connect-redis");
require('dotenv').config();

const username = process.env.REDIS_USER
const password = process.env.REDIS_PASSWORD
const host = process.env.REDIS_HOST || 'localhost'
const port = process.env.REDIS_PORT || '6379'

const redisLabs = `redis://${username}:${password}@${host}:${port}`
const local = `redis://${host}:${port}`

const connectionURI = username && password ? redisLabs : local;

const redisClient = redis.createClient({
    url: connectionURI,
    legacyMode: true
});

try{
    redisClient.connect().catch(console.error)

}catch(err){
    console.log(err)
}

module.exports = redisClient;