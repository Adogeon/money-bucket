import { fetchDataRequest } from "./factory.api";
import { dateToMonthQuery } from "../utils/month";

export const getUserMonthlyBudget = async (
    token: string | null,
    month: Date = new Date()
): Promise<any> => {
    return await fetchDataRequest(`api/budget/m/${dateToMonthQuery(month)}`, token);
}

export const getMonthBucketBudget = async (
    token: string | null,
    month: Date = new Date(),
    bucketId: string
): Promise<any> => {
    return await fetchDataRequest(`api/budget/m/${dateToMonthQuery(month)}&${bucketId}`, token);
}