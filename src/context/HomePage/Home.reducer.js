import {
  LOAD_USER_BUCKET_PENDING,
  LOAD_USER_BUCKET_FINISHED,
  OPEN_NEW_TRANSACTION_MODAL,
  CLOSE_NEW_TRANSACTION_MODAL,
} from "./Home.action";

export const HomeInitialState = {
  isFetchingBucket: true,
  bucketList: [],
  isFetchingTransaction: true,
  transactionList: [],
  transactionTotalPage: 0,
  transactionCurrentPage: 1,
  isAddTransactionModalOpen: false,
};

export const HomeReducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER_BUCKET_PENDING:
      return { ...state, isFetchingBucket: true, bucketList: [] };
    case LOAD_USER_BUCKET_FINISHED:
      console.log(action);
      return { ...state, isFetchingBucket: false, bucketList: action.payload };
    case OPEN_NEW_TRANSACTION_MODAL:
      return { ...state, isAddTransactionModalOpen: true };
    case CLOSE_NEW_TRANSACTION_MODAL:
      return { ...state, isAddTransactionModalOpen: false };
    default:
      return state;
  }
};
