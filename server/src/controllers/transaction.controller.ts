import transactionRepo from "src/layers/data/transactionRepo";
import type { iTransaction } from "src/models/transaction";

export default Object.freeze({
    listByMonth: (userId: string, monthDO: monthDO) => {
        return transactionRepo.listByMonth(userId, monthDO);
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