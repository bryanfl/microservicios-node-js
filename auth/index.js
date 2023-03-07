const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

class Auth {

    generateToken(data) {
        return jwt.sign(data, config.api.SECRET_JWT)
    }

    verifyToken(req, res, next) {
        const tokenBearer = req.headers['authorization'];

        if (!tokenBearer) {
            throw error('No envia el token', 401)
        }

        const token = tokenBearer.indexOf('Bearer ') === - 1 ? '' : tokenBearer.replace('Bearer ', '');

        if (token === '') {
            throw error('Formato inválido', 401)
        }

        const payload = jwt.verify(token, config.api.SECRET_JWT);

        if (!payload) {
            throw error('Token no valido', 401);
        }

        req.user = payload;

        next();
    }
}

module.exports = new Auth()