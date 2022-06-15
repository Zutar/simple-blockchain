import {blockchainRouter, nodeRouter, peersRouter} from './routers/index.js';
import bodyParser from 'body-parser';
import express from 'express';
import {error, warning, success, info} from '../utils/console.js';

const initHttpServer = (port) => {
    const app = express();

    app.use(bodyParser.json());

    app.use('/blockchain', blockchainRouter);
    app.use('/node', nodeRouter);
    app.use('/peers', peersRouter);
    // TODO add catch with error message and stop node
    app.listen(port, () => {
        success('[http server] Start on port: ' + port);
    });
}

export default initHttpServer;