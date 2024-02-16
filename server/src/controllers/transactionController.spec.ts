import { jest } from "@jest/globals";
import transactionController from "./transaction.controller";
import transactionRepo from "src/data/transactionRepo";

jest.mock("src/data/transactionRepo")

describe("transactionController", () => {
    describe("listByMonth", () => {
        it("should call the correct repo method with right params", () => {
            transactionController.listByMonth("userId", { month: 1, year: 2024 });
            expect(transactionRepo.listByMonth).toHaveBeenCalledTimes(1);
            expect(transactionRepo.listByMonth).toHaveBeenCalledWith("userId", { month: 1, year: 2024 })
        })
    });
    describe("create", () => {
        it("should call the correct repo method", () => {
            const testTransaction: iTransaction = {
                amount: 10,
                currency: "USD",
                from: "test-bucket-1",
                to: "test-bucket-2",
                summary: "test transaction",
                user: "test-user",
                date: new Date()
            }
            transactionController.create(testTransaction);
            expect(transactionRepo.addNewTransaction).toHaveBeenCalledTimes(1);
            expect(transactionRepo.addNewTransaction).toHaveBeenCalledWith(testTransaction);
        })
    });
    describe("getOneById", () => {
        it("should call the correct repo method", () => {
            transactionController.getOneById("test-transaction-id");
            expect(transactionRepo.searchTransactionById).toHaveBeenCalledTimes(1);
            expect(transactionRepo.searchTransactionById).toHaveBeenCalledWith("test-transaction-id");
        })
    }); describe("updateTransaction", () => {
        it("should call the correct repo method", () => {
            const testTransactionUpdate: Partial<iTransaction> = {
                amount: 15,
                from: "test-bucket-1",
                to: "test-bucket-3",
            }
            transactionController.updateById("test-transaction-id", testTransactionUpdate);
            expect(transactionRepo.updateTransaction).toHaveBeenCalledTimes(1);
            expect(transactionRepo.updateTransaction).toHaveBeenCalledWith("test-transaction-id", testTransactionUpdate);
        })
    }); describe("deleteTransation", () => {
        it("should call the correct repo method", () => {
            transactionController.deleteById("test-transaction-id");
            expect(transactionRepo.deleteTransaction).toHaveBeenCalledTimes(1);
            expect(transactionRepo.deleteTransaction).toHaveBeenCalledWith("test-transaction-id");
        })
    });
})


