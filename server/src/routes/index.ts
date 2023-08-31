import express, {Router} from 'express';
import authRouter from "./auth";
import transactionRouter from "./transaction";

const router:Router = express.Router();

router.use('/auth', authRouter);
router.use('/transaction', transactionRouter)
export default router;

//TODO: Rewrite all routes from js files to tsc files