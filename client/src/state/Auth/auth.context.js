import { createContext } from "react";
import {
	createUseStoreValueHook,
	createUseStoreDispatchHook,
} from "../utils/factory";
import { loadUser } from "./auth.action";

export const AuthContext = createContext();

export const useAuthState = createUseStoreValueHook(AuthContext, "Auth");
export const useAuthDispatch = createUseStoreDispatchHook(AuthContext, "Auth");

// Hooks to get auth state, either from current state or from the browser.
export const useAuthToken = () => {
	const store = useAuthState();
	if (store.token !== "") {
		return store.token;
	} else {
		if (localStorage.token !== "") {
			loadUser(localStorage.token);
			return localStorage.token;
		} else {
			//throw this in error state (implement error catch)
			console.log("Auth error");
		}
	}
};
