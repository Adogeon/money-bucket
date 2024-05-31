import models from "../models";
import type { monthDO } from "../common/types";

const Budget = models.Budget;

export default Object.freeze({
    listBucketMonthlyBudget: async function (month: monthDO, bucketId: string) {
        const budget = await Budget.find({ period: { month: month.month, year: month.year }, bucket: bucketId }).lean();
        return budget;
    },
    listUserMonthlyBudgets: async function (month: monthDO, userId: string) {
        const budgets = await Budget.find({ period: { month: month.month, year: month.year }, user: userId }).lean();

        return budgets;
    }
})
