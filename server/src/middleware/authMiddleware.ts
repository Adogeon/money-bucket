import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

export type RequestWithUser = Request & {
  user: {
    id: string
  }
}

export const assertHasUser = (req: Request): RequestWithUser => {
  //type requestion
    if (!req.body.user ) {
        throw new Error("Request object without user found unexpectedly");
    }
    return req as RequestWithUser;
}


//rewrite jwtMiddleware
/*export const jwtMiddleware = () => jwt({
  secret: ():string => {
    if (typeof process.env.SECRET !== "undefined") {
      return process.env.SECRET
    }
    throw new Error("Enviroment secret is undefined!");
  },
  algorithms: ["HS256"],
  credentialsRequired: false,
}).unless({path: "/auth"})
*/

