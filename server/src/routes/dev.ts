import express, {Router, Request, Response, NextFunction} from "express";
import {ParamsDictionary} from "express-serve-static-core";


const router: Router = express.Router();

router.get('/link', async ( req: Request, res: Response, next: NextFunction) => {
  res.json("We're connected!")
})