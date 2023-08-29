import React from "react";
import { AuthReducer, AuthInitialState } from "./auth.reducer";
import { AuthContext } from "./auth.context";

const AuthProvider = (props) => {
	const [state, dispatch] = React.useReducer(AuthReducer, AuthInitialState);
	const value = { state, dispatch };

	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
