import { Schema, model } from "mongoose";
import type { Types, PopulatedDoc, Document } from "mongoose";
import type { iTransaction } from "./transaction";

export interface iBucket extends Document {
  name: string;
  type: string;
  user: Types.ObjectId;
  defaultLimit: number;
  currency: string;
  monthlyRecord?: [
    {
      month: string;
      expense: number;
    }
  ];
  transactions?: PopulatedDoc<iTransaction & Document>;
}

const BucketSchema = new Schema<iBucket>({
  name: String,
  type: String,
  defaultLimit: Number,
  currency: String,
  monthlyRecord: [
    {
      month: String,
      expense: Number,
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
