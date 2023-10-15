import {Schema, model} from "mongoose";
import type {Types} from "mongoose";

export interface iTransaction {
  summary: string,
  amount: number,
  type: string,
  date: Date,
  bucket: Types.ObjectId,
  user: Types.ObjectId,
}

const TransactionSchema = new Schema<iTransaction>({
  summary: String,
  amount: Number,
  bucket: { type: Schema.Types.ObjectId, ref: "Bucket" },
  type: String,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

TransactionSchema.set('toJSON', {
  virtuals: true
})

const Transaction = model<iTransaction>("Transaction", TransactionSchema,'transaction');

export default Transaction