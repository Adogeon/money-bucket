export const LOAD_BUCKET = "LOAD_BUCKET";

export const bucketInitialState = {
  isLoading: false,
  bucketList: [],
};

export const loadBucketToStore = (payload) => {
  return { type: LOAD_BUCKET, payload };
};

const bucketReducer = (state, action) => {
  switch (action.type) {
    case LOAD_BUCKET:
      return { ...state, bucketList: action.payload };
    default:
      return state;
  }
};

export default bucketReducer;
