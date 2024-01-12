import transactionRepo from "src/layers/data/transactionRepo";
import type { iTransaction } from "src/models/transaction";

export default Object.freeze({
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