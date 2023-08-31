import express, { Express } from 'express';
import bodyParser from 'body-parser';
//import { jwtMiddleware } from 'middleware/jwtMiddleware';
import routers from "./routes";


const app: Express = express();

//middleware
app.use(bodyParser.json());
//app.use("/", jwtMiddleware())

app.use(routers);

export default app;

