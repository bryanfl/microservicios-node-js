const Remote = require('./remote');
const config = require('../config');

module.exports = new Remote(config.redis.HOST_API, config.redis.PORT_API);