import express, { Express } from 'express';
import bodyParser from 'body-parser';

import routers from "./routes";


const app: Express = express();

//middleware
app.use(bodyParser.json());

app.use(routers);

export default app;

