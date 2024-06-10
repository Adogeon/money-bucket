import express from "express";
import type { Request, RequestHandler } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import transactionController from "../controllers/transaction.controller";
import { convertParamsToMonthDO, getUserId } from "./utils";
import type { iTransaction } from "../common/types";

const router = express.Router();

type TypedBodyReq<T> = Request<ParamsDictionary, Record<string, unknown>, T>;

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
  .get((async (req, res, next) => {
    try {
      const transactionId = req.params.id;
      const transactionDoc = await transactionController.getOneById(transactionId);
      res.json(transactionDoc);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler)
  .put((async (req, res, next) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const updateTransaction = await transactionController.updateById(id, update);
      res.json(updateTransaction);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler).delete((async (req, res, next) => {
    try {
      const id = req.params.id;
      const isSuccess = await transactionController.deleteById(id);
      return isSuccess ? res.sendStatus(200) : res.sendStatus(404);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler)

/**
 * @route GET /transaction/m/:month
 * for getting detail about all transaction within a month
 *
 * return multiple transaction within a month
 */
router.get("/m/:month", (async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const month = convertParamsToMonthDO(req.params.month)
    console.log(req.params);
    const transactionList = await transactionController.listByMonth(userId, month)
    res.json(transactionList);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

router.get("/m/:month/:bucketId", ((async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const month = convertParamsToMonthDO(req.params.month)
    const bucketId = req.params.bucketId;
    console.log(req.params);
    const transactionReport = await transactionController.listByMonthAndBucket(userId, month, bucketId);
    res.json(transactionReport);
  } catch (error) {
    next(error);
  }
})) as RequestHandler);



export default router;
