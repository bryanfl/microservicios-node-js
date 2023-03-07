const fetch = require('node-fetch');

class Remote {
    #port;
    #host;

    constructor(host, port) {
        this.#host = host;
        this.#port = port;
    }

    async list(table) {
        return await this.#req({table});
    }

    async listOne(table, id) {
        return await this.#req({table, params: id});
    }

    async insert(table, data) {
        return await this.#req({method: 'POST', table, body: data});
    }

    async update(table, id, data) {
        return await this.#req({method: 'PUT', table, params: id, body: data});
    }

    async delete(table, id) {
        return await this.#req({method: 'DELETE', table, params: id});
    }

    async query(table, query, join) {
        return await this.#req({method: 'POST', table: table + '/query', body: { query, join }});
    }

    async #req({
        method = 'GET', table, body, params
    }) {
        let url = `http://${this.#host}:${this.#port}/${table}`

        if (params) url = url + `/${params}`;
        if (body) body = JSON.stringify(body);

        const response = await fetch(url, {
            method,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        return response.body
    }
}

module.exports = Remote;