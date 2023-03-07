const Response = require('./response');

const errors = (err, req, res, next) => {
    const message = err.message || 'Internal server error';
    const status = err.statusCode || 500;

    Response.error(req, res, message, status);
}

module.exports = errors;