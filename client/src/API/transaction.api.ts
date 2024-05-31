import { createRequest, handleResponse } from "./factory.api";
import type {
  Transaction,
  iEditTransactionInput,
  iTransactionDisplay,
} from "../types/transaction";
import { dateToMonthQuery } from "../utils/month";

export const addTransaction = async (
  user: string,
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
  user: string,
  month: Date = new Date()
): Promise<iMonthTransactions> => {
  try {
    const fetchResponse = await createRequest(
      `/api/transaction/m/${dateToMonthQuery(month)}`,
      user
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    throw error;
  }
};

interface bucketMonthlySpending {
  transactions: Transaction[],
  totalFrom: number,
  totalTo: number
}
export const getBucketMonthlyTransaction = async (
  token: string | null,
  month: Date,
  bucketId: string
): Promise<bucketMonthlySpending> => {
  try {
    const fetchResponse = await createRequest(
      `/api/transaction/m/${dateToMonthQuery(month)}&${bucketId}`,
      token
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getTransactionDetail = async (
  user: string,
  transactionId: string
): Promise<iTransactionDisplay> => {
  try {
    const fetchResponse = await createRequest(
      `/api/transaction/${transactionId}`,
      user
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putTransactionEdit = async (
  user: string,
  transactionId: string,
  updateTransaction: Partial<iEditTransactionInput>
): Promise<any> => {
  try {
    const fetchResponse = await createRequest(
      `/api/transaction/${transactionId}`,
      user,
      "PUT",
      updateTransaction
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTransaction = async (
  user: string,
  transactionId: string
): Promise<any> => {
  try {
    const fetchResponse = await createRequest(
      `/api/transaction/${transactionId}`,
      user,
      "DELETE"
    );
    const result = fetchResponse.ok;
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
