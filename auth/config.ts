import { Express } from 'express';
import * as dotenv from 'dotenv';
import DbWorker from './models/DbWorker';
import cors from 'cors';
import route from './routes';
import bodyParser from 'body-parser';

const setConfigs = (app: Express) => {
    dotenv.config({ path: __dirname + '/.env' });
    app.use(bodyParser.json());
    app.use(
        cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        })
    );
    DbWorker.connect();

    app.use('/', route);
};

export default setConfigs;
