import { Schema, model } from "mongoose";
import type { Types, Document } from "mongoose";

export interface iTransactionDoc extends Document, iTransaction { };

const TransactionSchema = new Schema<iTransactionDoc>({
  summary: String,
  amount: Number,
  currency: String,
  from: { type: Schema.Types.ObjectId, ref: "Bucket", required: true },
  to: { type: Schema.Types.ObjectId, ref: "Bucket", required: true },
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

TransactionSchema.set("toJSON", {
  virtuals: true,
});

const Transaction = model<iTransactionDoc>(
  "Transaction",
  TransactionSchema,
  "transaction"
);

export default Transaction;
