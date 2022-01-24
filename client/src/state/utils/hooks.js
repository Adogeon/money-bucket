import { useContext } from "React";
import { StoreContext } from "../../state";

export const useStoreValue = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("Can only use useState within StoreContext Provider");
  }

  return context.state;
};

export const useStoreDispatch = (action) => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("Can only use useDispatch within StoreContext Prvoider");
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
