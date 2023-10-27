import { createRequest, handleResponse } from "./factory.api";

interface iBucket {
  id: string;
  name: string;
  currency: string;
  limit: number;
}

export const getMonthlyBucketSummary = async (
  user: string | null,
  month: Date = new Date()
): Promise<iBucket[]> => {
  try {
    const getBucketSummaryResponse = await createRequest(
      `/bucket/${month}`,
      user
    );
    const bucketSummaries = await handleResponse(getBucketSummaryResponse);
    return bucketSummaries;
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
