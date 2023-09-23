import express from "express"; 
import type {Router} from 'express';
import authRouter from "./auth";
import transactionRouter from "./transaction";

import { jwtMiddleware } from "../middleware/authMiddleware";

const router:Router = express.Router();

router.use('/auth', authRouter);
router.use('/transaction', jwtMiddleware, transactionRouter)
export default router;

