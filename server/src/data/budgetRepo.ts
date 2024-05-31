import models from "../models";
import type { iBudget, monthDO } from "../common/types";

const Budget = models.Budget;

export default Object.freeze({
    listBucketMonthlyBudget: async function (month: monthDO, bucketId: string) {
        const budget = await Budget.findOne({ period: { month: month.month, year: month.year }, bucket: bucketId }).lean();
        return budget;
    },
    listUserMonthlyBudgets: async function (month: monthDO, userId: string) {
        const budgets = await Budget.find({ period: { month: month.month, year: month.year }, user: userId }).lean();
        return budgets;
    },
    addNewBudget: async function (newBudget: iBudget) {
        const budget = new Budget({ ...newBudget });
        await budget.save();
        return budget;
    },
    updateBudget: async function (budgetId: string, update: Partial<iBudget>) {
        const updateBudget = await Budget.findByIdAndUpdate(budgetId, update, { new: true });
        return updateBudget;
    },
    deleteBudget: async function (budgetId: string) {
        const deleteBudget = await Budget.findByIdAndDelete(budgetId);
        return deleteBudget !== null
    }
})
