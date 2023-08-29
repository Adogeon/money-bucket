import {
	createUseStoreValueHook,
	createUseStoreDispatchHook,
} from "../utils/factory";

export const AuthContext = createContext();

export const useAuthState = createUseStoreValueHook(AuthContext, "Auth");
export const useAuthDispatch = createUseStoreDispatchHook(AuthContext, "Auth");
