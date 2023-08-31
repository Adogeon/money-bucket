export const fetchUserLoginToken = async (username, password) => {
	const requestBody = { username: username, password: password };
	try {
		const fetchResult = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		});
		if (fetchResult.status !== 200) {
			throw new Error(fetchResult.statusText);
		}
		return await fetchResult.json();
	} catch (error) {
		console.log(error);
	}
};

export const fetchUserRegisterToken = async (username, password, email) => {
	const requestBody = { username, password, email };
	try {
		const fetchResult = await fetch("/api/auth/register", {
			method: "POST",
			body: requestBody,
		});
		if (fetchResult.status !== 200) {
			throw new Error(fetchResult.statusText);
		}
		return await fetchResult.json();
	} catch (error) {
		console.log(error);
	}
};
