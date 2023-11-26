import express from "express";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";
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
          id: "$detail._id",
          name: "$detail.name",
          currency: "$detail.currency",
          limit: "$detail.defaultLimit",
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

    const TransactionPipeline = [
      {
        $addFields: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          month: reqMonth,
          year: reqYear,
        },
      },
    ];

    const newBucketSummaries = Bucket.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: "transaction",
          localField: "_id",
          foreignField: "from",
          as: "spend",
          pipeline: TransactionPipeline,
        },
      },
      {
        $lookup: {
          from: "transaction",
          localField: "_id",
          foreignField: "to",
          as: "fund",
          pipeline: TransactionPipeline,
        },
      },
      {
        $project: {
          id: "$_id",
          totalSpend: { $sum: "$spend.amount" },
          totalFund: { $sum: "$spend.fund" },
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);
    console.log(newBucketSummaries);

    res.status(200).json(bucketSummariesDocs);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

router.get("/simple", async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const bukcetList = await Bucket.aggregate([
      { $match: { user: userId } },
      { $addFields: { id: "$_id" } },
      { $project: { name: 1, _id: 0, id: 1 } },
      { $sort: { name: 1 } },
    ]);

    res.status(200).json(bukcetList);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /bucket/:name
 * for gettting the bucket
 */
router.get("/:bucketId", (async (req, res, next) => {
  try {
    const userId = getUserId(req);

    const bucketDoc = await Bucket.findOne({
      _id: req.params.bucketId,
      user: userId,
    });

    if (bucketDoc === null)
      throw new Error(`Can't find bucket with id ${req.params.bucketId}`);

    const bucketJSON = bucketDoc.toJSON();
    res.status(200).json(bucketJSON);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

/**
 * @route GET /bucket/:bucketId/m/:month
 *
 */
router.get("/:bucketId/m/:month", (async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const bucketId = new mongoose.Types.ObjectId(req.params.bucketId);
    const reqMonth = Number(req.params.month.slice(0, 2));
    const reqYear = Number(req.params.month.slice(2));

    const TransactionPipeline = [
      {
        $addFields: {
          id: "$_id",
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
        $project: {
          bucket: 0,
          _id: 0,
          user: 0,
        },
      },
    ];

    const BucketPipeline = [
      { $match: { user: userId, _id: bucketId } },
      {
        $lookup: {
          from: "transaction",
          localField: "_id",
          foreignField: "bucket",
          as: "transactions",
          pipeline: TransactionPipeline,
        },
      },
      {
        $project: {
          name: 1,
          id: "$_id",
          defaultLimit: 1,
          transactions: 1,
          currency: 1,
          totalSpend: { $sum: "$transactions.amount" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ];

    const bucketDocs = await Bucket.aggregate(BucketPipeline);
    console.log(bucketDocs);
    if (bucketDocs.length !== 1) throw new Error("Can't find the document");
    res.status(200).json(bucketDocs[0]);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
