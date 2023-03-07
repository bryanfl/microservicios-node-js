const express = require('express');
const app = express();
const config = require('../config');
const bodyParser = require('body-parser');
const cors = require('cors');
const errors = require('../network/errors');

const postRouter = require('./components/post/network');

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
        this.app.use('/api/post', postRouter);
        this.app.use(errors)
    }

    init() {
        this.config();
        this.routes();

        this.app.listen(this.port, () => {
            console.log('listening on port ' + this.port)
        });
    }
}

const server = new Server(app, config.posts.PORT_API);
server.init();