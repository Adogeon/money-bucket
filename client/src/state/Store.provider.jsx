import React, { useReducer, useMemo } from "react";
import combineReducer from "./utils/combineReducer";

import {
  authReducer,
  bucketReducer,
  transactionReducer,
  userReducer,
  authInitialState,
} from "./reducers";

export const StoreContext = React.createContext({});

const initialState = {
  transaction: {},
  bucket: {},
  user: {},
  auth: authInitialState,
};
const rootReducer = combineReducer({
  transaction: transactionReducer,
  bucket: bucketReducer,
  user: userReducer,
  auth: authReducer,
});

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  console.log(state);
  console.log(dispatch);
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  console.log(value);

  return (
    <StoreContext.Provider value={value}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
