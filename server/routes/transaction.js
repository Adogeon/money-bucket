const router = require("express").Router();
const { Transaction } = require("../models");

/**
 * @route POST /transaction
 * for insert on transaction
 * expect req.user
 * return a transction document in JSON format
 */
router.post("/", async (req, res, next) => {
  const userId = req.user.id;
  try {
    const transaction = await Transaction.create({ ...req.body, user: userId });
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
router.post("/multi", async (req, res, next) => {
  const userId = req.user.id;
  try {
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

module.exports = router;
