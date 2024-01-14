import express from "express";
import type { Request, RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import Transaction from "../models/transaction";
import transactionController from "src/controllers/transaction.controller";
import type { iTransaction } from "../models/transaction";
import Bucket from "../models/bucket";
import { getUserId, strToObjectId } from "./utils";

const router = express.Router();

type TypedBodyReq<T> = Request<ParamsDictionary, Record<string, any>, T>;

/**
 * @route POST /transaction
 * for insert on transaction
 * expect req.user
 * return a transaction document in JSON format
*/
type iTransactionInput = Omit<iTransaction, "user">;
router.post("/", (async (req: TypedBodyReq<iTransactionInput>, res, next) => {
  try {
    const userId = getUserId(req);
    const transaction = await transactionController.create({ ...req.body, user: userId });
    res.status(200).json({ ...transaction });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const transactionId = req.params.id;
      const transactionDoc = transactionController.getOneById(transactionId);
      res.json(transactionDoc);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const updateTransaction = await transactionController.updateById(id, update);
      res.json(updateTransaction);
    } catch (error) {
      next(error);
    }
  }).delete(async (req, res, next) => {
    try {
      const id = req.params.id;
      const isSuccess = await transactionController.deleteById(id);
      return isSuccess ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  })

/**
 * @route POST /transaction/multi
 * for insert multiple transaction at once
 * expect req.user
 * return a transction document in JSON format
 */

router.post("/multi");

/**
 * @route GET /transaction/m/:month
 * for getting detail about all transaction within a month
 *
 * return multiple transaction within a month
 */
router.get("/m/:monthyear", (async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const reqMonth = parseInt(req.params.monthyear.slice(0, 2));
    const reqYear = parseInt(req.params.monthyear.slice(2));
    const transactionDocs = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $addFields: {
          id: "$_id",
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
      {
        $sort: {
          date: -1,
        },
      },
      {
        $lookup: {
          from: "bucket",
          localField: "bucket",
          foreignField: "_id",
          as: "bucket",
          pipeline: [
            { $addFields: { id: "$_id" } },
            { $project: { name: 1, id: 1, _id: 0 } },
          ],
        },
      },
      { $unwind: { path: "$bucket" } },
      {
        $project: {
          month: 0,
          year: 0,
          user: 0,
          _id: 0,
          _v: 0,
        },
      },
    ]);
    res.status(200).json(transactionDocs);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

/**
 * @route GET /transaction/:id
 * for getting detail about a transaction
 * expect req.user
 *
 * return a specific transaction
 */

/**
 * @route GET /transaction/bucket/:name
 * for gettting the bucket
 */
router.get("/bucket/:name", (async (req, res, next) => {
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
