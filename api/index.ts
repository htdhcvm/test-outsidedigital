import express from 'express';
import setConfigs from './config';
const app = express();

setConfigs(app);

app.listen(process.env.PORT, () =>
    console.log(`Api server has been started on ${process.env.PORT} port`)
);
