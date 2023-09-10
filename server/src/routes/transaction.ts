import express, {Request} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from 'mongoose';

import Transaction,{iTransaction} from "../models/transaction";
import Bucket from "../models/bucket";

const router = express.Router()

type TypedBodyReq<T> = Request<ParamsDictionary, {}, T>

const getUserId = (req: Request): mongoose.Types.ObjectId => {
  if (!req.user) {
    throw Error("Can't find user in request")
  }
  return new mongoose.Types.ObjectId(req.user.id)
};

/**
 * @route POST /transaction
 * for insert on transaction
 * expect req.user
 * return a transaction document in JSON format
 */
type iTransactionInput = Omit<iTransaction, "user">;
router.post("/", async (req: TypedBodyReq<iTransactionInput>, res, next) => {
  try {
    const userId = getUserId(req);
    const transaction = await Transaction.create({ ...req.body, user: userId});
    const transactionJSON = transaction.toJSON();
    res.status(200).json({ ...transactionJSON });
  } catch (error) {
    next(error);
  }
});

/**
 * @route POST /transaction/multi
 * for insert multiple transaction at once
 * expect req.user
 * return a transction document in JSON format
 */
interface iMultTransactionInput {
  transactions: iTransaction[]
}
router.post("/multi", async (req: TypedBodyReq<iMultTransactionInput>, res, next) => {
  try {
    const userId = getUserId(req);
    const transactions = req.body.transactions.map((transaction) => ({
      ...transaction,
      user: userId,
    }));
    const transactionDocs = await Transaction.insertMany(transactions);
    const transactionsJSON = transactionDocs.map((transaction) =>
      transaction.toJSON()
    );
    res.status(200).json([...transactionsJSON]);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /transaction/:month
 * for getting detail about all transaction within a month
 * 
 * return multiple transaction within a month
 */
router.get("/:monthyear", async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const reqMonth = Number(req.params.monthyear.slice(0, 2));
    const reqYear = Number(req.params.monthyear.slice(2));
    const transactionDocs = await Transaction.aggregate(
      [
        { $match: { user: userId } },
        {
          $addFields: {
            month: { $month: '$date' }, year: { $year: "$date" }
          }
        }, {
          $match: {
            month: reqMonth, year: reqYear
          }
        }, {
          $sort: {
            date: -1
          }
        }, {
          $lookup: {
            from: 'bucket',
            localField: 'bucket',
            foreignField: '_id',
            as: 'bucket',
            pipeline: [{ $project: { type: 0, user: 0 } }]
          }
        }, {
          $project: {
            month: 0, year: 0, _v: 0
          }
        }
      ]
    );
    if (!transactionDocs) throw new Error("Something is wrong the document");
    res.status(200).json(transactionDocs);
  } catch (error) {
    next(error)
  }
})

/**
 * @route GET /transaction/:id
 * for getting detail about a transaction
 * expect req.user
 * 
 * return a specific transaction
 */
router.get("/:id", async (req,res,next) => {
  try {
    const userId = getUserId(req);
    const transactionDoc = await Transaction.findOne({_id: req.params.id, user: userId});
    if(!transactionDoc) throw new Error("Can't find the specific document ")
    const transactionJSON = transactionDoc.toJSON()
    res.json(200).json(transactionJSON);
  } catch (error) {
    next(error);
  }
});

/**
 * @route GET /transaction/bucket/:name
 * for gettting the bucket 
 */
router.get("/bucket/:name", async (req,res,next) => {
  try {
    const userId = getUserId(req);
    const bucketDoc = await Bucket.findOne({name: req.params.name, user: userId});
    if(!bucketDoc) throw new Error(`Can't find bucket with name ${req.params.name}`);
    
    const transactions = await bucketDoc.populate('transactions');
    const bucketJSON = bucketDoc.toJSON();
    bucketJSON.transactions = transactions;
    res.status(200).json(bucketJSON);
  } catch(error) {
    next(error)
  }
})


export default router