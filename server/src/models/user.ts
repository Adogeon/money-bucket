import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import type { Document } from "mongoose";
import type { iUser } from "src/common/types";

export interface iUserDoc extends Document, iUser {
  username: string;
  password: string;
  comparePassword: (inputPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<iUserDoc>({
  username: { type: String, required: true },
  password: { type: String, required: true },
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

userSchema.pre<iUserDoc>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


userSchema.methods.comparePassword = async function (
  this: iUserDoc,
  inputPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

userSchema.set("toJSON", { virtuals: true });

const User = model<iUserDoc>("User", userSchema, "user");

export type iUserModel = typeof User;
export default User;
