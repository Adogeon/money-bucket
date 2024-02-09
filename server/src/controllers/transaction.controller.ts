import transactionRepo from "src/data/transactionRepo";

export default Object.freeze({
    listByMonth: (userId: string, monthDO: monthDO) => {
        return transactionRepo.listByMonth(userId, monthDO);
    },
    listByMonthAndBucket: async (userId: string, monthDO: monthDO, bucketId: string) => {
        const transactionList = await transactionRepo.listByMonth(userId, monthDO);
        const filterFromBucketList = transactionList.filter(transaction => { transaction.from === bucketId })
        const filterToBucketList = transactionList.filter(transaction => { transaction.to === bucketId });

        return { fromList: filterFromBucketList, toList: filterToBucketList };
    },
    create: (resource: iTransaction) => {
        return transactionRepo.addNewTransaction(resource);
    },
    getOneById: (id: string) => {
        return transactionRepo.searchTransactionById(id);
    },
    updateById: (id: string, update: Partial<iTransaction>) => {
        return transactionRepo.updateTransaction(id, update);
    },
    deleteById: (id: string) => {
        return transactionRepo.deleteTransaction(id);
    }
})

