import {Schema, Types, model, PopulatedDoc, Document} from "mongoose";
import { iTransaction } from "./transaction";

export interface iBucket {
  name: string;
  type: string;
  user: Types.ObjectId;
  transactions?: PopulatedDoc<iTransaction & Document>
}

const BucketSchema = new Schema<iBucket>({
  name: String,
  type: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

BucketSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "bucket",
});

const Bucket = model<iBucket>("Bucket", BucketSchema);

export default Bucket;
