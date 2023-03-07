const err = require('../../../utils/error');

const checkToken = (req, res, next) => {
    const a = 1;

    if (a === 2) {
        throw err('Hola mundooooooo!', 401)
    }
    next();
}

module.exports = {
    checkToken
}