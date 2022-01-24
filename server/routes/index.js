const router = require("express").Router();

const bucketRouter = require("./bucket");
const authRouter = require("./auth");
const transactionRouter = require("./transaction");
const userRouter = require("./user");

router.use("/auth", authRouter);
router.use("/bucket", bucketRouter);
router.use("/transaction", transactionRouter);
router.use("/user", userRouter);
