export const getUserBucket = async () => {
  const result = await [
    { id: 1, name: "Essential", spend: 60, limit: 100 },
    { id: 2, name: "Food", spend: 20, limit: 200 },
    { id: 3, name: "Media", spend: 40, limit: 50 },
  ];
  return result;
};

export const getBucketDetail = async (bucketId) => {
  const result = await {};
  return result;
};
