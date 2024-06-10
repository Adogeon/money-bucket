import express from "express";
import type { Router } from "express";
import authRouter from "./auth";
import transactionRouter from "./transaction";
import bucketRouter from "./bucket";
import budgetRouter from "./budget";

import { authMiddleware } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/transaction", authMiddleware, transactionRouter);
router.use("/bucket", authMiddleware, bucketRouter);
router.use("/budget", authMiddleware, budgetRouter)

export default router;
