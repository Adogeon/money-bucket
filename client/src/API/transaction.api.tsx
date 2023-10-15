import type { apiFunc } from ".";
import { createRequest, handleResponse } from "./factory.api";

export const addTransaction: apiFunc = async (
  user,
  newTransaction: any
): Promise<any> => {
  try {
    const fetchResponse = await createRequest(
      `api/transation`,
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

export const getMonthTransactions: apiFunc = async (
  user,
  month: Date = new Date()
): Promise<any> => {
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
  }
};
