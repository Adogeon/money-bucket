import express, { NextFunction, Request, Response, Router } from 'express';
import { getUserId } from './utils';
import User from 'src/models/user';

const router: Router = express.Router();

/**
 * GET "/user/"
 * Get account detail
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const userDoc = await User.findById(userId);
    if (!userDoc) return res.sendStatus(500);

    const userJSON = userDoc.toJSON();
    delete userJSON.password;

    res.status(200).json({ ...userJSON });
  } catch (error) {
    next(error);
  }
})

/**
 * POST "/user/" 
 * Update account detail
 */

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = getUserId(req);
    const userDoc = await User.findByIdAndUpdate(userId, req.body, { new: true })
    res.status(200).json(userDoc)
  } catch (error) {
    next(error);
  }
})


export default router;