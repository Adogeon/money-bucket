import { createUseStoreValueHook, createUseStoreDis } from "../utils/factory";

export const AuthContext = createContext();

export const useAuthState = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useHomeState must be used within a AuthProvider");
	}
	return context.state;
};

export const useAuthDispatch = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useHomeDispatch must be used within a AuthProvider");
	}
	return async (action) => {
		const actionResult = action;
		if (action.type === "thunk") {
			return actionResult.func(context);
		} else {
			context.dispatch(actionResult);
		}
	};
};
