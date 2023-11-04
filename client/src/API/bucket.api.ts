import { createRequest, handleResponse } from "./factory.api";
import type { iBucketSummary } from "../components/Bucket/BucketSummary";

export const getMonthlyBucketSummary = async (
  user: string | null,
  month: Date = new Date()
): Promise<iBucketSummary[]> => {
  const monthStr =
    `${month.getMonth() + 1}`.padStart(2, "0") + `${month.getFullYear()}`;
  try {
    const getBucketSummaryResponse = await createRequest(
      `/api/bucket/summary/${monthStr}`,
      user
    );
    const bucketSummaries = await handleResponse(getBucketSummaryResponse);
    return bucketSummaries;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserBucketList = async (user: string | null): Promise<any> => {
  try {
    const fetchResponse = await createRequest(`/api/bucket/simple`, user);
    const bucketList = await handleResponse(fetchResponse);
    return bucketList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBucketDetail = async (
  auth: string | null,
  bucketName: string
): Promise<any> => {
  try {
    const fetchResponse = await fetch(`/bucket/${bucketName}`, {
      headers: { Authorization: `Bearer ${auth}` },
    });
    if (fetchResponse.status !== 200) {
      throw new Error(fetchResponse.statusText);
    }
    return await fetchResponse.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
