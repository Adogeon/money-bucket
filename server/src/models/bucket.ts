import { Schema, model } from "mongoose";
import type { Types, PopulatedDoc, Document } from "mongoose";
import type { iTransaction } from "./transaction";

export interface iBucket {
  name: string;
  type: string;
  user: Types.ObjectId;
  defaultLimit: PaymentCurrencyAmount;
  monthlyLimit?: [
    {
      month: string;
      limit: PaymentCurrencyAmount;
    }
  ];
  transactions?: PopulatedDoc<iTransaction & Document>;
}

const BucketSchema = new Schema<iBucket>({
  name: String,
  type: String,
  defaultLimit: {
    amount: Number,
    currency: String,
  },
  monthlyLimit: [
    {
      month: String,
      limit: {
        amount: Number,
        currency: String,
      },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

BucketSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "bucket",
});

const Bucket = model<iBucket>("Bucket", BucketSchema, "bucket");

export default Bucket;
