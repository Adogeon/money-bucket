import express from 'express';
import type { NextFunction, Request, Response, Router, RequestHandler } from 'express';
import { getUserId } from './utils';
import User from '../models/user';

const router: Router = express.Router();

/**
 * GET "/user/"
 * Get account detail
 */
router.get('/', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const userDoc = await User.aggregate([
      {
        $match: { _id: userId }
      },
      {
        $project: {
          password: 0,
          _v: 0
        }
      },
      {
        $lookup: {
          from: "bucket",
          localField: "_id",
          foreignField: "user",
          as: "buckets"
        }
      }
    ]);
    if (userDoc.length === 0) {
      return res.sendStatus(500)
    };
    res.status(200).json(userDoc);
  } catch (error) {
    next(error);
  }
}) as RequestHandler)

/**
 * POST "/user/" 
 * Update account detail
 */

router.post("/", (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const userDoc = await User.findByIdAndUpdate(userId, req.body, { new: true })
    res.status(200).json(userDoc)
  } catch (error) {
    next(error);
  }
}) as RequestHandler)


export default router;