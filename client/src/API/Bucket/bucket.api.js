export const getUserBucket = async () => {
	const result = await [
		{ id: 1, name: "Essential", spend: 60, limit: 100 },
		{ id: 2, name: "Food", spend: 20, limit: 200 },
		{ id: 3, name: "Media", spend: 40, limit: 50 },
	];
	return result;
};

export const getBucketDetail = async (bucketName, userToken) => {
	try {
		const fetchResponse = await fetch(`/bucket/${bucketName}`, {
			headers: { Authorization: `Bearer ${userToken}` },
		});
		if (fetchResponse.status !== 200) {
			throw new Error(fetchResponse.statusText);
		}
		return await fetchResponse.json();
	} catch (error) {
		console.log(error);
	}
};
