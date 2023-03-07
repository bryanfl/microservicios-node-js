const pgsql = require('../../../store/remote-pgsql');
const cache = require('../../../store/remote-cache')
const Response = require('../../../network/response');
const { generateHash } = require('../../../utils/hash');
const error = require('../../../utils/error');
const TABLA = 'users';

class UserController {
    async list(req, res, next) {
        try {
            let users = await cache.list(TABLA);

            if (!users) {
                console.log('Informacion no encontrada en Cache');
                users = await pgsql.list(TABLA)
                cache.insert(TABLA, users)
            } else {
                console.log('Informacion encontrada en Cache');
            }

            return Response.success(req, res, users, 200);
        } catch (err) {
            next(err)
        }
    }

    async insert(req, res, next) {
        try {
            const userFind = (await pgsql.query(TABLA, { username: req.body.username }))[0];

            if (userFind) throw error('User already exists', 400)

            const newUser = {
                ...req.body,
                password: await generateHash(req.body['password']),
            };

            const user = await pgsql.insert(TABLA, newUser);

            return Response.success(req, res, user, 201);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const body = req.body;
            const idUser = req.params['id'];

            const user = await pgsql.update(TABLA, idUser, body);

            return Response.success(req, res, user, 200);
        } catch (err) {
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const idUser = req.params['id'];

            const user = await pgsql.delete(TABLA, idUser).catch(err => next(err));

            return Response.success(req, res, user, 200);
        } catch (err) {
            next(err)
        }
    }

    async follow(req, res, next) {
        const TABLA_FOLLOW = 'user_follow';
        const userFrom = req.user;
        const userTo = await pgsql.listOne(TABLA, req.params['idUserTo']).catch(err => next(err));

        const userFollow = await (pgsql.query(TABLA_FOLLOW, { "user_from": userFrom.id, "user_to": userTo.id }))[0];

        if (!userFollow) {
            const newFollow = await pgsql.insert(TABLA_FOLLOW, { "user_from": userFrom.id , "user_to": userTo.id })

            return Response.success(req, res, newFollow, 201)
        } else {
            return Response.error(req, res, 'El usuario ya lo esta siguiendo', 400)
        }
    }
}

module.exports = UserController;