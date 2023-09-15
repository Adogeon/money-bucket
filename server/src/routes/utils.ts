import { Request } from "express";
import mongoose from "mongoose";

export const getUserId = (req: Request): mongoose.Types.ObjectId => {
  if (!req.user) {
    throw Error("Can't find user in request")
  }
  return new mongoose.Types.ObjectId(req.user.id)
};