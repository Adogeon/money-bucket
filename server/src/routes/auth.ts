import express from 'express';
import type {Router, Request, Response, NextFunction, RequestHandler} from "express";
import type {ParamsDictionary} from "express-serve-static-core";
import * as jsonwebtoken from 'jsonwebtoken';
import User from "../models/user";

const router: Router = express.Router();
/**
 * @route POST /auth/login
 * expect {username, password } in req.body
 */

interface authRequest {
  username: string,
  password: string,
  email?: string
}

const serverSecret = ():string => {
    if (typeof process.env.SECRET !== "undefined") {
      return process.env.SECRET
    }
    throw new Error("Enviroment secret is undefined!");
}

router.post("/login", (async(req: Request<ParamsDictionary, any, authRequest>, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (username === "" || password === "")
    return res.status(400).json({ error: "Username and password required" });

  try {
    const userDoc = await User.findOne({ username });
    if (userDoc === null) return res.sendStatus(401);
    if (await userDoc.comparePassword(password)) {
    const token = jsonwebtoken.sign(
      {
        id: userDoc._id,
      },
      serverSecret()
    );
    res.status(200).json(token);
  } else {
      res.status(401)
    }
  } catch (error) {
    next(error);
  }
}) as RequestHandler)

/**
 * @route POST /auth/register
 * expect {username, email, password } in req.body
 */
router.post("/register", (async (req: Request<ParamsDictionary, any, authRequest>, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  if (username === "" || email === "" || password === "")
    return res
      .status(400)
      .json({ error: "Username, email, and password required" });

  try {
    const userDoc = await User.create(req.body);
    const token = jsonwebtoken.sign({ id: userDoc._id }, serverSecret());
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;

