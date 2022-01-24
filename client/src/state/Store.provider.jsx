import React, { useReducer, useMemo } from "react";
import combineReducer from "./utils/combineReducer";

import { bucketReducer, transactionReducer, userReducer } from "./reducers";

export const StoreContext = React.createContext({});

const initialState = { transaction: {}, bucket: {}, user: {} };
const rootReducer = combineReducer({
  transactionReducer,
  bucketReducer,
  userReducer,
});
const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const value = useMemo(() => {
    state, dispatch;
  }, [state]);

  return (
    <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
  );
};

export default StoreProvider;
