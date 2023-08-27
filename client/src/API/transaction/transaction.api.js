export const addTransaction = async (newTransaction, token) => {
	try {
		const fetchResponse = await fetch("/", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTransaction),
		});
		if (fetchResponse.status !== 200) {
			throw new Error(fetchResponse.error);
		}
		return fetchResponse.body;
	} catch (error) {
		console.log(error);
	}
};

export const getCurrentMonthTransactions = async (month, token) => {
	try {
		const fetchResponse = await fetch(`/${month}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (fetchResponse.status !== 200) {
			throw new Error(fetchResponse.error);
		}
	} catch (error) {
		console.log(error);
	}
};
