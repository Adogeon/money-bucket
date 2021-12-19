import { useContext, createContext } from "react";

export const HomeContext = createContext();

export const useHomeState = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeState must be used within a HomeProvider");
  }
  return context.state;
};

export const useHomeDispatch = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeDispatch must be used within a HomeProvider");
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
