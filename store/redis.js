const client = require('../utils/redis_init');

class Redis {
    async list(table) {
        const res = await client.get(table);
        return JSON.parse(res);
    }

    async listOne(table, id) {
        const value = await client.get(`${table}_${id}`);
        return JSON.parse(value);
    }

    async upsert(table, data, id) {
        let key = table;
        if (data && id) {
            key = key + '_' + id;
        }

        await client.set(key, JSON.stringify(data), {
            EX: 10,
            NX: true
        });

        return true;
    }
}

module.exports = new Redis();
