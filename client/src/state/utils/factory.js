import { useContext } from "react";

//hooks factory
export const createUseStoreValueHook = (store, storeName) => () => {
	const context = useContext(store);
	if (context === undefined) {
		throw new Error(`Can only use within ${storeName}Context Provider`);
	}

	return context.state;
};

export const createUseStoreDispatchHook = (store, storeName) => () => {
	const context = useContext(store);
	if (context === undefined) {
		throw new Error(`Can only use within ${storeName}Context Provider`);
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

//action factory
export const createAction = (actionType) => (payload) => {
	return payload === "undefined"
		? { type: actionType }
		: { type: actionType, payload };
};

export const createAsyncThunk = (actionType, asynFunc) => (arg) => ({
	type: "thunk",
	func: async (context) => {
		const thunk = {
			dispatch: context.dispatch,
			state: context.state,
			pending: createAction(`${actionType}/pending`),
			finished: createAction(`${actionType}/finished`),
			error: createAction(`${actionType}/error`),
		};
		asynFunc(arg, thunk)
			.then((result) => {
				context.dispatch(thunk.finished(result));
			})
			.catch((e) => context.dispatch(thunk.error(e)));
	},
});
