import { Express } from 'express';
import * as dotenv from 'dotenv';
import DbWorker from './models/DbWorker';
import tagRoutes from './routes/TagRoutes';
import userRoutes from './routes/UserRoutes';
import bodyParser from 'body-parser';

const setConfigs = (app: Express) => {
    dotenv.config({ path: __dirname + '/.env' });
    app.use(bodyParser.json());
    app.use('/', tagRoutes);
    app.use('/', userRoutes);
    DbWorker.connect();
};

export default setConfigs;
