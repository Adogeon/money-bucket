export const getBucketSummaries = async ():Promise<any> => {
  return await Promise.resolve([
    { id: 1, name: "Essential", spend: 60, limit: 100 },
    { id: 2, name: "Food", spend: 20, limit: 200 },
    { id: 3, name: "Media", spend: 40, limit: 50 },
  ]);
}

export const getBucketDetail = async (auth:string, bucketName: string) : Promise<any> => {
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
  }
};
