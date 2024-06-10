import models from "../models";
import { MongoMonthQueryDO } from "./utils/monthQueryDO";
import type { monthDO, iTransaction } from "src/common/types";

const TransactionDB = models.Transaction;

export default Object.freeze({
    listByMonth: async function (userId: string, month: monthDO) {
        const filter = {
            user: userId, date: new MongoMonthQueryDO(month).generateQuery()
        }
        const result = await TransactionDB.find(filter).sort({ date: -1 }).lean()
        return result;
    },
    listByMonthAndBucket: async function (userId: string, month: monthDO, bucketId: string) {
        const transactionList = await TransactionDB.find({
            user: userId,
            date: new MongoMonthQueryDO(month).generateQuery(),
            $or: [
                { from: bucketId },
                { to: bucketId }
            ]
        }).sort({ date: -1 }).lean({ getters: true });
        return transactionList;
    },
    searchTransactionById: async function (transactionId: string) {
        const result = await TransactionDB.findOne({ _id: transactionId }).lean().populate({ path: "from", match: "_id name" }).populate({ path: "to", match: "_id name" });
        return result;
    },
    addNewTransaction: async function (transactionInput: Partial<iTransaction>) {
        const newTransaction = new TransactionDB(transactionInput);
        await newTransaction.save();
        return newTransaction;
    },
    updateTransaction: async function (transactionId: string, transactionUpdate: Partial<iTransaction>) {
        const updateTransaction = await TransactionDB.findByIdAndUpdate(transactionId, transactionUpdate, { new: true, lean: true });
        return updateTransaction;
    },
    deleteTransaction: async function (transactionId: string) {
        const deleteTransaction = await TransactionDB.findByIdAndDelete(transactionId, { lean: true });
        return deleteTransaction?._id === transactionId ?? false;
    }
})