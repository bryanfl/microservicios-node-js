const pgsql = require('../../../store/remote-pgsql');
const Response = require('../../../network/response');
const TABLA = 'users';
const error = require('../../../utils/error');
const auth = require('../../../auth');
const { compareHash } = require('../../../utils/hash')
class UserController {
    async login(req, res, next) {
        try {
            const user = (await pgsql.query(TABLA, { username: req.body.username }))[0];

            if (!user) throw new Error();

            console.log(req.body)

            const passwordSame = await compareHash(req.body.password, user.password);

            if (!passwordSame) throw new Error();

            delete user.password;

            return Response.success(req, res, {
                ...user,
                token: auth.generateToken(user)
            }, 200);

        } catch(err) {
            return Response.error(req, res, 'Usuario o contraseña no coinciden', 402);
        }
    }
}

module.exports = UserController;