import express from "express";
import type { RequestHandler } from "express";

import { convertParamsToMonthDO, getUserId } from "./utils";
import budgetRepo from "src/data/budgetRepo";

const router = express.Router();

router.get("/:month", (async (req, res, next) => {
    try {
        const userId = getUserId(req);
        const month = convertParamsToMonthDO(req.params.month);
        const result = await budgetRepo.listUserMonthlyBudgets(month, userId);
        return res.json(result);
    } catch (error) {
        next(error)
    }
}) as RequestHandler)

router.get("/:month&:bucket", (async (req, res, next) => {
    try {
        const month = convertParamsToMonthDO(req.params.month);
        const result = await budgetRepo.listBucketMonthlyBudget(month, req.params.bucket);
        return res.json(result);
    } catch (error) {
        next(error)
    }
}) as RequestHandler);

export default router;