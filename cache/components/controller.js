const store = require('../../store/redis');
const Response = require('../../network/response')

class CacheController {
    async list(req, res, next) {
        try {
            const data = await store.list(req.params['table'])
            return Response.success(req, res, data, 200);
        } catch (err) {
            next(err);
        }
    }

    async listOne(req, res, next) {
        try {
            const data = await store.listOne(req.params['table'], req.paramas['id'])
            return Response.success(req, res, data, 200);
        } catch (err) {
            next(err);
        }
    }

    async insert(req, res, next) {
        try {
            const data = await store.upsert(req.params['table'], req.body)
            return Response.success(req, res, data, 200);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const data = await store.upsert(req.params['table'], req.body, req.params['id'])
            return Response.success(req, res, data, 200);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new CacheController();