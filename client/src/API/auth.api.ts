export interface iAuthToken {
	token: string
}

export type LoginRequestDAO = {
	username: string,
	password: string
}
export const fetchUserLoginToken = async (input: LoginRequestDAO): Promise<iAuthToken> => {
	const fetchResult = await fetch("/api/auth/login", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input),
	});
	if (!fetchResult.ok) {
		throw new Error("Server response problem");
	}
	return await fetchResult.json();
};

export type RegisterRequestDAO = {
	username: string,
	password: string,
	email: string
}
export const fetchUserRegisterToken = async (input: RegisterRequestDAO): Promise<iAuthToken> => {
	const fetchResult = await fetch("/api/auth/register", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(input),
	});
	if (!fetchResult.ok) {
		throw new Error("Server response problem");
	}
	return await fetchResult.json();
};
