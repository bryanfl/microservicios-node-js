const redis = require('redis');
const config = require('../config');
const urlRedis = `redis://${config.redis.USER_DB}:${config.redis.PASS_DB}@${config.redis.HOST_DB}:${config.redis.PORT_DB}`

const client = redis.createClient({
    // host: config.redis.HOST_DB,
    // port: config.redis.PORT_DB,
    // password: config.redis.PASS_DB
    url: urlRedis
})

const connectRedis = async () => {
    client
    .connect()
    .then(() => console.log('connected to redis'))
    .catch((err) => console.error('connection redis error', err))
}

connectRedis()

module.exports = client;
