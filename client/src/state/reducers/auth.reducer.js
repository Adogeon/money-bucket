export const LOG_IN_USER = "LOG_IN_USER";
export const LOG_IN_USER_PENDING = "LOG_IN_USER/pending";
export const LOG_IN_USER_FINISHED = "LOG_IN_USER/finished";
export const REGISTER_NEW_USER = "REGISTER_NEW_USER";
export const REGISTER_NEW_USER_PENDING = "REGISTER_NEW_USER/pending";
export const REGISTER_NEW_USER_FINISHED = "REGISTER_NEW_USER/finsihed";
export const LOAD_USER_FROM_BROWSER = "LOAD_USER_FROM_BROWSER";
export const LOG_OUT_USER = "LOG_OUT_USER";

export const authInitialState = {
  userToken: "",
  isAuthenticate: false,
  isNewUser: false,
  isPending: false,
};

export const authReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case LOAD_USER_FROM_BROWSER:
    case LOG_IN_USER_FINISHED:
      return {
        ...state,
        isAuthenticate: true,
        isPending: false,
        userToken: action.payload,
      };
    case LOG_IN_USER_PENDING:
    case REGISTER_NEW_USER_PENDING:
      return {
        ...state,
        isPending: true,
      };
    case REGISTER_NEW_USER_FINISHED:
      return {
        ...state,
        isAuthenticate: true,
        isPending: false,
        userToken: action.payload,
        isNewUser: true,
      };
    case LOG_OUT_USER:
      return {
        ...state,
        userToken: "",
        isAuthenticate: false,
        isNewUser: false,
      };
    default:
      return state;
  }
};
