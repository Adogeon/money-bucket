import express, {Express} from 'express';
import { jwtMiddleware } from './middleware/jwtMiddleware';
import routers from "./routes";

const app = express();

app.use("/", jwtMiddleware())

app.use(routers);

export default app;

