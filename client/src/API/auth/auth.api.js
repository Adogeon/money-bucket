export const fetchUserLoginToken = async (username, password) => {
	const requestBody = { username: username, password: password };
	try {
		const fetchResult = await fetch("/auth/login", {
			method: "POST",
			body: requestBody,
		});
		if (fetchResult.status !== 200) {
			throw new Error(fetchResult.statusText);
		}
		return fetchResult.body.token;
	} catch (error) {
		console.log(error);
	}
};

export const fetchUserRegisterToken = async (username, password, email) => {
	const requestBody = { username, password, email };
	try {
		const fetchResult = await fetch("/auth/register", {
			method: "POST",
			body: requestBody,
		});
		if (fetchResult.status !== 200) {
			throw new Error(fetchResult.statusText);
		}
		return fetchResult.body.token;
	} catch (error) {
		console.log(error);
	}
};
