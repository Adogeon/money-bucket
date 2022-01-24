export const LOAD_BUCKET = "LOAD_BUCKET";

export const loadBucketToStore = (payload) => {
  return { type: LOAD_BUCKET, payload };
};

const bucketReducer = (state, action) => {
  switch (action.type) {
    case LOAD_BUCKET:
      const stateCopy = { ...state };
      stateCopy.bucketList = action.payload;
      return stateCopy;
    default:
      return state;
  }
};

export default bucketReducer;
