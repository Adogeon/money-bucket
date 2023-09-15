import React, { useState } from "react";
import { fetchUserRegisterToken } from "../../API/auth/auth.api";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleSubmit = async () => {
		const token = await fetchUserRegisterToken(username, password, email);
		console.log(token);
		//navigate to homepage;
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div>
				<button type="submit">Submit</button>
				<button>Cancel</button>
			</div>
		</form>
	);
};

const RegisterPage = () => {
	return (
		<div>
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
