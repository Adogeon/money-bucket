import express, {Request, Response, NextFunction} from "express";
import {ParamsDictionary } from "express-serve-static-core";
import {assertHasUser } from "middleware/jwtMiddleware";
import Transaction,{iTransaction} from "models/transaction";
import Bucket from "models/bucket";

const router = express.Router()

type TypedBodyReq<T> = Request<ParamsDictionary, {}, T>

const getUserId = (req: Request): string => {
  const verifiedReq = assertHasUser(req);
  return verifiedReq.user.id;
} 

/**
 * @route POST /transaction
 * for insert on transaction
 * expect req.user
 * returna transaction document in JSON format
 */
type iTransactionInput = Omit<iTransaction, "user">
router.post("/", async (req: TypedBodyReq<iTransactionInput>, res, next) => {
  try {
    const userId = getUserId(req);
    const transaction = await Transaction.create({ ...req.body, user: userId});
    const transactionJSON = transaction.toJSON();
    res.json(200).json({ ...transactionJSON });
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
    res.json(200).json([...transactionsJSON]);
  } catch (error) {
    next(error);
  }
});

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
router.get("/transaction/bucket/:name", async (req,res,next) => {
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

/**
 * @route PUT /transaction/:id
 * for updating a transaction
 */
router.put("/transaction/bucket/:id", async (req: TypedBodyReq<Partial<iTransactionInput>>, res, next) => {
  try {
    const userId = getUserId(req);
    const transactionId = req.params.id;
    const transactionDoc = await Transaction.findOne({_id: transactionId, user: userId});
    if(!transactionDoc) throw new Error(`Can't find transaction with id ${transactionId}`)
    const updatedDoc = await Transaction.findByIdAndUpdate(transactionId, req.body, {new: true});
    const docJSON = updatedDoc?.toJSON();
    res.status(200).json(docJSON);
  } catch (error) {
    next(error)
  }
})

export default router