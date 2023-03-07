const Remote = require('./remote');
const config = require('../config');

module.exports = new Remote(config.pgsql.HOST_API, config.pgsql.PORT_API);