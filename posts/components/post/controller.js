const pgsql = require('../../../store/remote-pgsql');
const Response = require('../../../network/response');
const TABLA = 'posts';

class PostController {
    async list(req, res, next) {
        const users = await pgsql.list(TABLA).catch(err => next(err));

        if (users) {
            return Response.success(req, res, users, 200);
        }
    }

    async insert(req, res, next) {
        const body = req.body;

        const user = await pgsql.insert(TABLA, body).catch(err => next(err));

        if (user) {
            return Response.success(req, res, user, 201);
        }
    }

    async update(req, res, next) {
        const body = req.body;
        const idUser = req.params['id'];

        const user = await pgsql.update(TABLA, idUser, body).catch(err => next(err));

        if (user) {
            return Response.success(req, res, user, 200);
        }
    }

    async delete(req, res, next) {
        const idUser = req.params['id'];

        const user = await pgsql.delete(TABLA, idUser).catch(err => next(err));

        if (user) {
            return Response.success(req, res, user, 200);
        }
    }

    async likePost(req, res, next) {
        const TABLA_LIKE_POST = 'user_like_post';
        const idPost = req.params['idPost'];
        const user = req.user;
        const post = await pgsql.listOne(TABLA, idPost).catch(err => next(err));

        if (post) {
            const userFollow = (await pgsql.query(TABLA_LIKE_POST, { "user_like": user.id, "post_like": idPost }))[0];

            if (!userFollow) {
                const postLike = await pgsql.insert(TABLA_LIKE_POST, { "user_like": user.id, "post_like": idPost }).catch(err => next(err));
                if (postLike) {
                    return Response.success(req, res, postLike, 201);
                }
            } else {
                Response.error(req, res, 'El usuario ya dio like al post', 400)
            }
        }
    }
}

module.exports = PostController;