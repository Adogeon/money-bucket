import {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";

/**
 * jwtMiddleware
 * @func an express middleWare function to verify jwtToken 
 * 
 * @param req: express request
 * @param res: express response
 * @param next: express next function
 * 
 * @return void
 */
export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // if no token is found
  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.SECRET as string, (err: any, user: any) => {
    console.log(err)
    if (err)
      return res.sendStatus(403);

    req.user = user;
    next();
  })
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

