import type { Request } from "express";
import type { monthDO } from "../common/types";
import mongoose from "mongoose";


export function getUserId(req: Request) {
  if (req.user === undefined) {
    throw Error("Can't find user in request");
  }
  return req.user.id;
};

export function strToObjectId(str: string): mongoose.Types.ObjectId {
  return new mongoose.Types.ObjectId(str);
}

export function convertParamsToMonthDO(monthParams: string): monthDO {
  return {
    month: Number(monthParams.slice(0, 2)),
    year: Number(monthParams.slice(2))
  }
}