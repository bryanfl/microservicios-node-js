const express = require('express');
const app = express();
const config = require('../config');
const bodyParser = require('body-parser');
const cors = require('cors');
const errors = require('../network/errors');

const cacheRouter = require('./components/network');

class Server {

    constructor(app, port) {
        this.app = app;
        this.port = port;
    }

    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    routes() {
        this.app.use('/', cacheRouter);
        this.app.use(errors)
    }

    init() {
        this.config();
        this.routes();

        this.app.listen(this.port, () => {
            console.log('listening Cache Redis on port ' + this.port)
        });
    }
}

const server = new Server(app, config.redis.PORT_API);
server.init();