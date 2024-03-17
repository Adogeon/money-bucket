export interface iAuthToken {
	token: string
}

export const fetchUserLoginToken = async (username: string, password: string): Promise<iAuthToken> => {
	const requestBody = { username, password };
	const fetchResult = await fetch("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(requestBody),
	});
	if (!fetchResult.ok) {
		throw new Error("Server response problem");
	}
	return await fetchResult.json();
};

export const fetchUserRegisterToken = async (username: string, password: string, email: string): Promise<iAuthToken> => {
	const requestBody = { username, password, email };
	const fetchResult = await fetch("/api/auth/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(requestBody),
	});
	if (!fetchResult.ok) {
		throw new Error("Server response problem");
	}
	return await fetchResult.json();
};
