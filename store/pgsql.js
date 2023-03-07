const client = require('../utils/pgsql_init');
const error = require('../utils/error');
const { v4: uuidv4 } = require('uuid');

class PgSQL {
    async list(table) {
        const query = {
            text: `SELECT * FROM ${table}`,
        }

        const res = await client.query(query).catch(err => {
            throw error(err.message);
        })

        return res.rows
    }

    async listOne(table, id) {
        const query = {
            text: `SELECT * FROM ${table} WHERE id = '${id}'`
        }

        const res = await client.query(query).catch(err => {
            throw error(err.message);
        })

        return res.rows ? res.rows[0] : null
    }

    async insert(table, data) {
        const newRegister = {
            ...data,
            id: uuidv4()
        }

        console.log(newRegister)

        const valueText = Array.from({ length: Object.values(newRegister).length }, (v, i) => `$${i + 1}`)

        const text = `INSERT INTO ${table}(${Object.keys(newRegister).join(',')}) VALUES(${valueText.join(',')}) RETURNING *`
        const values = Object.values(newRegister);

        console.log(text)

        const res = await client.query(text, values).catch(err => {
            throw error(err.message);
        })

        return res.rows[0]
    }

    async update(table, id, data) {
        let strValues = ""
        for (const key in data) {
            strValues += `${key} = '${data[key]}', `
        }

        strValues = strValues.substring(0, strValues.length - 2);

        const text = `UPDATE ${table} SET ${strValues} WHERE id = '${id}' RETURNING *`

        const res = await client.query(text).catch(err => {
            throw error(err.message);
        })

        return res.rows[0]
    }

    async delete(table, id) {
        const text = `DELETE FROM ${table} WHERE id = '${id}' RETURNING *`

        const res = await client.query(text).catch(err => {
            throw error(err.message);
        })

        if (res.rowCount > 0) {
            return res.rows[0]
        }

        throw error("Usuario no existe.", 400);
    }

    async query(table, data, join) {
        let joinQuery = '';
        if (join) {
            const key = Object.keys(join)[0];
            const val = join[key];
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
        }

        let strValues = ""
        for (const key in data) {
            strValues += `${table}.${key} = '${data[key]}' and `
        }

        strValues = strValues.substring(0, strValues.length - 4);

        const query = {
            text: `SELECT * FROM ${table} ${joinQuery} WHERE ${strValues}`
        }

        const res = await client.query(query).catch(err => {
            throw error(err.message);
        })

        return res.rows ?? null
    }
}

module.exports = new PgSQL();