import { Express } from 'express';

import * as dotenv from 'dotenv';

const setConfigs = (app: Express) => {
    dotenv.config({ path: __dirname + '/.env' });
};

export default setConfigs;
