export const fetchUserLoginToken = async (username: string, password: string): Promise<Response | undefined>  => {
	const requestBody = { username, password};
	try {
		const fetchResult = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		});
		return fetchResult
	} catch (error) {
		console.log(error);
	}
};

export const fetchUserRegisterToken = async (username: string, password: string, email: string): Promise<Response | undefined> => {
	const requestBody = { username, password, email };
	try {
		const fetchResult = await fetch("/api/auth/register", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(requestBody),
		});
		return fetchResult
	} catch (error) {
		console.log(error);
	}
};
