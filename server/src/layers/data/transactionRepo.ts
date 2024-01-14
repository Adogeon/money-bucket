import models from "src/models";
import type { iTransaction } from "src/models/transaction";

const TransactionDB = models.Transaction;

class mongoMonthQueryDO implements monthQueryDO {
    private _month: number;
    private _year: number;
    constructor(input: monthDO) {
        this._month = input.month;
        this._year = input.year;
    }
    generateQuery() {
        return this._month === 12
            ? {
                $gte: `${this._year}-${this._month}-01`,
                $lt: `${this._year + 1}-1-01`
            } : {
                $gte: `${this._year}-${this._month}-01`,
                $lt: `${this._year}-${this._month + 1}-01`
            }
    }
}

export default Object.freeze({
    listByMonth: async function (userId: string, monthDO: monthDO) {
        try {
            const filter = {
                user: userId, date: new mongoMonthQueryDO(monthDO).generateQuery()
            }
            const result = await TransactionDB.find(filter).lean().populate({ path: "from", match: "_id name" }).populate({ path: "to", match: "_id name" })
            return result;
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
    },
})