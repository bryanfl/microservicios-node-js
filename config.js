// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, 'development.env')
});

const config = {
    api: {
        PORT: process.env.PORT || 3000,
        SECRET_JWT: process.env.SECRET_JWT || ''
    },
    pgsql: {
        PORT_DB: process.env.PORT_PGSQL,
        HOST_DB: process.env.HOST_PGSQL,
        USER_DB: process.env.USER_PGSQL,
        PASS_DB: process.env.PASSWORD_PGSQL,
        DATABASE_DB: process.env.DATABASE_PGSQL,
        PORT_API: process.env.PORT_API_PGSQL,
        HOST_API: process.env.HOST_API_PGSQL
    },
    posts: {
        HOST_API: process.env.HOST_API_POSTS,
        PORT_API: process.env.PORT_API_POSTS
    },
    redis: {
        HOST_API: process.env.HOST_API_REDIS,
        PORT_API: process.env.PORT_API_REDIS,
        PORT_DB: process.env.PORT_DB_REDIS,
        HOST_DB: process.env.HOST_DB_REDIS,
        PASS_DB: process.env.PASSWORD_DB_REDIS,
        USER_DB: process.env.USER_DB_REDIS
    }
}

module.exports = config