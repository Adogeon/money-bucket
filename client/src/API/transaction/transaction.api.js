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
		return await fetchResponse.json();
	} catch (error) {
		console.log(error);
	}
};

export const getMonthTransactions = async (token, month) => {
	let monthyear;
	if (!month) {
		const tDate = new Date();
		monthyear =
			`${tDate.getMonth() + 1}`.padStart(2, "0") +
			`${tDate.getFullYear()}`;
		console.log(monthyear);
	} else {
		monthyear = month;
	}

	try {
		const fetchResponse = await fetch(`api/transaction/${monthyear}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});
		if (fetchResponse.status !== 200) {
			throw new Error(fetchResponse.error);
		}

		return await fetchResponse.json();
	} catch (error) {
		console.log(error);
	}
};
