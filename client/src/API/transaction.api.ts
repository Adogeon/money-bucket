import { createRequest, handleResponse } from "./factory.api";

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

interface iTransactionView {
  summary: string;
  amount: number;
  currency: string;
  type: string;
  date: Date;
  bucket: [
    {
      name: string;
      id: string;
    }
  ];
}

type iMonthTransactions = Array<iTransactionView>;
export const getMonthTransactions = async (
  user: string | null,
  month: Date = new Date()
): Promise<iMonthTransactions> => {
  const monthyear =
    `${month.getMonth() + 1}`.padStart(2, "0") + `${month.getFullYear()}`;
  try {
    const fetchResponse = await createRequest(
      `api/transaction/${monthyear}`,
      user
    );
    const result = await handleResponse(fetchResponse);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
