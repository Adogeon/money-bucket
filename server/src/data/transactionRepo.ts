import models from "../models";
import { mongoMonthQueryDO } from "./utils/monthQueryDO";

const TransactionDB = models.Transaction;

export default Object.freeze({
    listByMonth: async function (userId: string, monthDO: monthDO) {
        try {
            const filter = {
                user: userId, date: new mongoMonthQueryDO(monthDO).generateQuery()
            }
            const result = await TransactionDB.find(filter).sort({ date: -1 }).lean()
            return result;
        } catch (error) {
            throw error;
        }
    },
    listByMonthAndBucket: async function (userId: string, monthDO: monthDO, bucketId: string) {
        try {
            const transactionList = await TransactionDB.find({
                user: userId,
                date: new mongoMonthQueryDO(monthDO).generateQuery(),
                $or: [
                    { from: bucketId },
                    { to: bucketId }
                ]
            }).sort({ date: -1 }).lean({ getters: true });

            return transactionList;
        } catch (error) {
            throw error;
        }
    },
    searchTransactionById: async function (transactionId: string) {
        try {
            const result = await TransactionDB.findOne({ _id: transactionId }).lean().populate({ path: "from", match: "_id name" }).populate({ path: "to", match: "_id name" });
            return result;
        } catch (error) {
            throw error;
        }
    },
    addNewTransaction: async function (transactionInput: Partial<iTransaction>) {
        try {
            const newTransaction = new TransactionDB(transactionInput);
            newTransaction.save();
            return newTransaction;
        } catch (error) {
            throw error;
        }
    },
    updateTransaction: async function (transactionId: string, transactionUpdate: Partial<iTransaction>) {
        try {
            const updateTransaction = await TransactionDB.findByIdAndUpdate(transactionId, transactionUpdate, { new: true, lean: true });
            return updateTransaction;
        } catch (error) {
            throw error;
        }
    },
    deleteTransaction: async function (transactionId: string) {
        try {
            const deleteTransaction = await TransactionDB.findByIdAndDelete(transactionId, { lean: true });
            return deleteTransaction?._id === transactionId ?? false;
        } catch (error) {
            throw error;
        }
    }
})