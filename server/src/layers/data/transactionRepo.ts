import models from "src/models";
import type { iTransaction } from "src/models/transaction";

const Transaction = models.Transaction;

export default Object.freeze({
    searchTransactionById: async function (transactionId: string) {
        try {
            const result = await Transaction.findOne({ _id: transactionId }).lean().populate({ path: "from", match: "_id name" }).populate({ path: "to", match: "_id name" });
            return result;
        } catch (error) {
            throw error;
        }
    },
    addNewTransaction: async function (transactionInput: Partial<iTransaction>) {
        try {
            const newTransaction = new Transaction(transactionInput);
            newTransaction.save();
            return newTransaction;
        } catch (error) {
            throw error;
        }
    },
    updateTransaction: async function (transactionId: string, transactionUpdate: Partial<iTransaction>) {
        try {
            const updateTransaction = await Transaction.findByIdAndUpdate(transactionId, transactionUpdate, { new: true, lean: true });
            return updateTransaction;
        } catch (error) {
            throw error;
        }
    },
    deleteTransaction: async function (transactionId: string) {
        try {
            const deleteTransaction = await Transaction.findByIdAndDelete(transactionId, { lean: true });
            return deleteTransaction?._id === transactionId ?? false;
        } catch (error) {
            throw error;
        }
    },

})