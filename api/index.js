const express = require('express');
const app = express();
const config = require('../config');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');
const errors = require('../network/errors');

const userRouter = require('./components/user/network');
const authRouter = require('./components/auth/network');

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
        this.app.use('/api/user', userRouter);
        this.app.use('/api/auth', authRouter);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

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

const server = new Server(app, config.api.PORT);
server.init();