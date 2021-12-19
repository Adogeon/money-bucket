import { getUserBucket } from "../../API/Bucket/bucket.api";

export const LOAD_USER_BUCKET = "LOAD_USER_BUCKET";
export const LOAD_USER_BUCKET_FINISHED = "LOAD_USER_BUCKET/finished";
export const LOAD_USER_BUCKET_PENDING = "LOAD_USER_BUCKET/pending";
export const OPEN_NEW_TRANSACTION_MODAL = "OPEN_NEW_TRANSACTION_MODAL";
export const CLOSE_NEW_TRANSACTION_MODAL = "CLOSE_NEW_TRANSACTION_MODAL";

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
    context.dispatch(thunk.pending());
    console.log(asynFunc);
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
