import { Schema, model } from "mongoose";
import type { Types, Document } from "mongoose";

export interface iTransaction extends Document {
  summary: string;
  amount: number;
  currency: string;
  date: Date;
  from: Types.ObjectId;
  to: Types.ObjectId;
  user: Types.ObjectId;
}

const TransactionSchema = new Schema<iTransaction>({
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

const Transaction = model<iTransaction>(
  "Transaction",
  TransactionSchema,
  "transaction"
);

export default Transaction;
