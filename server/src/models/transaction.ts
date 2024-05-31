import { Schema, model } from "mongoose";
import type { Document } from "mongoose";
import type { iTransaction } from "src/common/types";
import mongooseLeanGetters from "mongoose-lean-getters";

export interface iTransactionDoc extends Document, iTransaction { };

const TransactionSchema = new Schema<iTransactionDoc>({
  summary: String,
  amount: Number,
  currency: String,
  from: { type: Schema.Types.ObjectId, ref: "Bucket", required: true, get: (v: Schema.Types.ObjectId | null) => v?.toString() ?? "" },
  to: { type: Schema.Types.ObjectId, ref: "Bucket", required: true, get: (v: Schema.Types.ObjectId | null) => v?.toString() ?? "" },
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

TransactionSchema.plugin(mongooseLeanGetters);

TransactionSchema.set("toJSON", {
  virtuals: true,
});

const Transaction = model<iTransactionDoc>(
  "Transaction",
  TransactionSchema,
  "transaction"
);

export default Transaction;
