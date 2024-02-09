import { Schema, model } from "mongoose";
import type { PopulatedDoc, Document } from "mongoose";

export interface iBucketDoc extends Document, iBucket {
  transactions?: PopulatedDoc<iTransaction & Document>;
}

const BucketSchema = new Schema<iBucketDoc>({
  name: String,
  type: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

BucketSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "bucket",
});

const Bucket = model<iBucketDoc>("Bucket", BucketSchema, "bucket");

export default Bucket;
