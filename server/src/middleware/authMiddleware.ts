import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { VerifyCallback } from "jsonwebtoken";

export interface iUserAuth {
  id: string;
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  // if no token is found
  if (token === undefined) {
    res.sendStatus(401);
  } else {
    jwt.verify(
      token,
      process.env.SECRET as string,
      ((err: any, user: iUserAuth) => {
        console.log(err);
        if (err) res.sendStatus(403);

        req.user = user;
        next();
      }) as VerifyCallback
    );
  }
};

// rewrite jwtMiddleware
/* export const jwtMiddleware = () => jwt({
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
