import { createRequest, handleResponse } from "./factory.api";
import type { Transaction } from "../types/transaction";

export const addTransaction = async (
  user: string | null,
  newTransaction: any
): Promise<any> => {
  try {
    const fetchResponse = await createRequest(
      "/api/transaction",
      user,
      "POST",
      newTransaction
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
  }
};

type iMonthTransactions = Array<Transaction>;
export const getMonthTransactions = async (
  user: string | null,
  month: Date = new Date()
): Promise<iMonthTransactions> => {
  const monthyear =
    `${month.getMonth() + 1}`.padStart(2, "0") + `${month.getFullYear()}`;
  try {
    const fetchResponse = await createRequest(
      `api/transactions/${monthyear}`,
      user
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTransactionDetail = async (
  user: string | null,
  transactionId: string
): Promise<Transaction> => {
  try {
    const fetchResponse = await createRequest(
      `api/transaction/${transactionId}`,
      user
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
