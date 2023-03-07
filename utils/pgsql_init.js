const { Client } = require('pg')
const config = require('../config')

const client = new Client({
    host: config.pgsql.HOST_DB,
    port: config.pgsql.PORT_DB,
    user: config.pgsql.USER_DB,
    password: config.pgsql.PASS_DB,
    database: config.pgsql.DATABASE_DB
})

const connectDB = () => {
    client
    .connect()
    .then(() => console.log('connected'))
    .catch((err) => console.error('connection error', err.stack))
}

connectDB()

module.exports = client