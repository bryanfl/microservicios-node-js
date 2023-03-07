const store = require('../../store/pgsql');
const Response = require('../../network/response')

class PgSQLController {
    async list(req, res, next) {
        const data = await store.list(req.params['table']).catch(err => next(err));

        if (data) {
            return Response.success(req, res, data, 200);
        }
    }

    async listOne(req, res, next) {
        const data = await store.listOne(req.params['table'], req.paramas['id']).catch(err => next(err));

        if (data) {
            return Response.success(req, res, data, 200);
        }
    }

    async insert(req, res, next) {
        const data = await store.insert(req.params['table'], req.body).catch(err => next(err));

        if (data) {
            return Response.success(req, res, data, 201);
        }
    }

    async update(req, res, next) {
        const data = await store.update(req.params['table'], req.params['id'], req.body).catch(err => next(err));

        if (data) {
            return Response.success(req, res, data, 200);
        }
    }

    async delete(req, res, next) {
        const data = await store.delete(req.params['table'], req.params['id']).catch(err => next(err));

        if (data) {
            return Response.success(req, res, data, 200);
        }
    }

    async query(req, res, next) {
        const data = await store.query(req.params['table'], req.body.query, req.params.join).catch(err => next(err));

        if (data) {
            return Response.success(req, res, data, 200);
        }
    }
}

module.exports = new PgSQLController();