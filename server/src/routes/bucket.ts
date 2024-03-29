import express from "express";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import mongoose from "mongoose";
import Bucket from "../models/bucket";
import { getUserId } from "./utils";
import bucketServices from "src/layers/services/bucket.services";

const router = express.Router();


router.post("/", async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const newBucket = await bucketServices.create({ ...req.body, user: userId });
    return res.json({ newBucket })
  } catch (error) {
    next(error)
  }
})

router.route("/:bucketId").get(async (req, res, next) => {
  try {
    const bucket = await bucketServices.getBucketById(req.params.bucketId);
    return res.json({ bucket })
  } catch (error) {
    next(error);
  }
}).put(async (req, res, next) => {
  try {
    const bucket = await bucketServices.updateBucketById(req.params.bucketId, req.body);
    return res.json({ bucket })
  } catch (error) {
    next(error)
  }
}).delete(async (req, res, next) => {
  try {
    const isSuccess = await bucketServices.deleteBucketById(req.params.bucketId);
    return isSuccess ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    next(error)
  }
})

router.get("/summary/:month", (async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const reqMonth = Number(req.params.month.slice(0, 2));
    const reqYear = Number(req.params.month.slice(2));

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

    const newBucketSummaries = await Bucket.aggregate([
      { $match: { user: userId } },
      {
        $lookup: {
          from: "transaction",
          localField: "_id",
          foreignField: "from",
          as: "fund",
          pipeline: TransactionPipeline,
        },
      },
      {
        $lookup: {
          from: "transaction",
          localField: "_id",
          foreignField: "to",
          as: "spend",
          pipeline: TransactionPipeline,
        },
      },
      {
        $project: {
          id: "$_id",
          name: 1,
          type: 1,
          limit: "$defaultLimit",
          currency: 1,
          totalSpend: { $sum: "$spend.amount" },
          count: { $size: "$spend" },
          totalFund: { $sum: "$fund.amount" },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);

    res.status(200).json(newBucketSummaries);
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
