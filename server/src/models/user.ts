import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import type { Document } from "mongoose";
import type { iTransaction } from "./transaction";
import type { iBucket } from "./bucket";

export interface iUser extends Document {
  username: string;
  password: string;
  currency: string;
  transaction?: iTransaction[];
  buckets?: iBucket[];
  comparePassword: (inputPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<iUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  currency: { type: String, default: "USD" },
});

userSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("buckets", {
  ref: "Bucket",
  localField: "_id",
  foreignField: "user",
});

userSchema.pre<iUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

/* userSchema.post<iUser>("find", async function(docs) {
  for (let doc of docs) {
    await doc.populate('transactions buckets')
  }
}) */

userSchema.methods.comparePassword = async function (
  this: iUser,
  inputPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (error) {
    console.log(error);
    return false;
  }
};

userSchema.set("toJSON", { virtuals: true });

const User = model<iUser>("User", userSchema, "user");

export default User;
