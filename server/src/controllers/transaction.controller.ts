import transactionRepo from "src/data/transactionRepo";

export default Object.freeze({
    listByMonth: function (userId: string, monthDO: monthDO) {
        return transactionRepo.listByMonth(userId, monthDO);
    },
    listByMonthAndBucket: async function (userId: string, monthDO: monthDO, bucketId: string) {
        const BucketMonthlyReport = await transactionRepo.listByMonthAndBucket(userId, monthDO, bucketId);
        const totalFrom = BucketMonthlyReport.fromList.reduce((acc, current) => acc + current.amount, 0);
        const totalTo = BucketMonthlyReport.fromList.reduce((acc, current) => acc + current.amount, 0);

        return { ...BucketMonthlyReport, totalFrom, totalTo };
    },
    create: function (resource: iTransaction) {
        return transactionRepo.addNewTransaction(resource);
    },
    getOneById: function (id: string) {
        return transactionRepo.searchTransactionById(id);
    },
    updateById: function (id: string, update: Partial<iTransaction>) {
        return transactionRepo.updateTransaction(id, update);
    },
    deleteById: function (id: string) {
        return transactionRepo.deleteTransaction(id);
    }
})

