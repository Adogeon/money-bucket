import { getUserBucket } from "../../API/Bucket/bucket.api";

export const LOAD_USER_BUCKET = "LOAD_USER_BUCKET";
export const LOAD_USER_BUCKET_FINISHED = "LOAD_USER_BUCKET/finished";
export const LOAD_USER_BUCKET_PENDING = "LOAD_USER_BUCKET/pending";
export const OPEN_NEW_TRANSACTION_MODAL = "OPEN_NEW_TRANSACTION_MODAL";
export const CLOSE_NEW_TRANSACTION_MODAL = "CLOSE_NEW_TRANSACTION_MODAL";
export const GET_MONTH_TRNS = "GET_MONTH_TRANSACTION";
export const GET_MONTH_TRNS_PENDING = "GET_MONTH_TRANSACTION/pending";
export const GET_MONTH_TRNS_FINISHED = "GET_MONTH_TRANSACTION/finished";

const createAction = (actionType) => (payload) => {
	console.log(payload);
	return payload === "undefined"
		? { type: actionType }
		: { type: actionType, payload };
};

const createAsyncThunk = (actionType, asynFunc) => (arg) => ({
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

export const openTransactionPage = createAction(OPEN_NEW_TRANSACTION_MODAL);
export const closeTransactionPage = createAction(CLOSE_NEW_TRANSACTION_MODAL);
export const loadUserBucket = createAsyncThunk(
	LOAD_USER_BUCKET,
	async (userId) => {
		const result = await getUserBucket(userId);
		return result;
	}
);

export const loadCurrentMonthTransaction = createAsyncThunk(
	GET_MONTH_TRNS,
	async (month, token) => {
		const result = await getMonthTransactions(month, token);
		return result;
	}
);
