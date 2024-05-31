import { Schema, model } from "mongoose";
import type { Document } from "mongoose";
import type { iBudget } from "../common/types";

export interface iBudgetDoc extends Document, iBudget { }

const BudgetSchema = new Schema<iBudgetDoc>({
    bucket: { type: Schema.Types.ObjectId, ref: "Bucket" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    period: {
        month: Number,
        year: Number
    },
    limit: Number,
    type: String
})

const Budget = model<iBudgetDoc>("Budget", BudgetSchema, "budget");

export default Budget;