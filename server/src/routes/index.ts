import express, {Router} from 'express';
import authRouter from "./auth";
import transactionRouter from "./transaction";
import devRouter from "./dev";

const router:Router = express.Router();

router.use('/auth', authRouter);
router.use('/transaction', transactionRouter);
router.use('/dev', devRouter);
export default router;