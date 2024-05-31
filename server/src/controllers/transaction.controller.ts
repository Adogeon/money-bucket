import transactionRepo from "../data/transactionRepo";
import type { iTransaction, monthDO } from "src/common/types";

export default Object.freeze({
    listByMonth: async function (userId: string, monthDO: monthDO) {
        return await transactionRepo.listByMonth(userId, monthDO);
    },
    listByMonthAndBucket: async function (userId: string, monthDO: monthDO, bucketId: string) {
        const BucketMonthlyReport = await transactionRepo.listByMonthAndBucket(userId, monthDO, bucketId);
        const totalFrom = BucketMonthlyReport.filter(transaction => transaction.from === bucketId).reduce((acc, current) => { return acc + current.amount }, 0);
        const totalTo = BucketMonthlyReport.filter(transaction => transaction.to === bucketId).reduce((acc, current) => { return acc + current.amount }, 0);

        return { transactions: BucketMonthlyReport, totalFrom, totalTo };
    },
    create: async function (resource: iTransaction) {
        return await transactionRepo.addNewTransaction(resource);
    },
    getOneById: async function (id: string) {
        return await transactionRepo.searchTransactionById(id);
    },
    updateById: async function (id: string, update: Partial<iTransaction>) {
        return await transactionRepo.updateTransaction(id, update);
    },
    deleteById: async function (id: string) {
        return await transactionRepo.deleteTransaction(id);
    }
})

