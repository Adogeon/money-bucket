import express from "express";
import type { Request, Response, NextFunction, RequestHandler } from "express";

import Bucket from "../models/bucket";
import { getUserId } from "./utils";
import Transaction from "../models/transaction";

const router = express.Router();

/**
 * @route GET /bucket/summary/:month
 * for getting user bucket summaries by the month
 */

router.get("/summary/:month", (async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const reqMonth = Number(req.params.month.slice(0, 2));
    const reqYear = Number(req.params.month.slice(2));
    const bucketSummariesDocs = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $addFields: {
          month: {
            $month: "$date",
          },
          year: {
            $year: "$date",
          },
        },
      },
      {
        $match: {
          month: reqMonth,
          year: reqYear,
        },
      },
      {
        $group: {
          _id: "$bucket",
          totalSpend: {
            $sum: "$amount",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $lookup: {
          from: "bucket",
          localField: "_id",
          foreignField: "_id",
          as: "detail",
        },
      },
      {
        $unwind: {
          path: "$detail",
        },
      },
      {
        $project: {
          _id: 0,
          name: "$detail.name",
          currency: "$detail.defaultLimit.currency",
          limit: "$detail.defaultLimit.amount",
          totalSpend: 1,
          count: 1,
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);
    res.status(200).json(bucketSummariesDocs);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

/**
 * @route GET /bucket/:name
 * for gettting the bucket
 */
router.get("/:name", (async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const bucketDoc = await Bucket.findOne({
      name: req.params.name,
      user: userId,
    });
    if (bucketDoc === null)
      throw new Error(`Can't find bucket with name ${req.params.name}`);

    const transactions = await bucketDoc.populate("transactions");
    const bucketJSON = bucketDoc.toJSON();
    bucketJSON.transactions = transactions;
    res.status(200).json(bucketJSON);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
