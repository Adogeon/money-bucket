import type { Request } from "express";
import mongoose from "mongoose";

export const getUserId = (req: Request): mongoose.Types.ObjectId => {
  if (req.user === undefined) {
    throw Error("Can't find user in request");
  }
  return strToObjectId(req.user.id);
};

export function strToObjectId(str: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(str);
}
