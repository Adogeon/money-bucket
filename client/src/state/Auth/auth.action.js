import {
  fetchUserLoginToken,
  fetchUserRegisterToken,
} from "../../API/auth.api";

import { createAction, createAsyncThunk } from "../utils/factory";

import {
  LOAD_USER_FROM_BROWSER,
  LOG_IN_USER,
  LOG_OUT_USER,
  REGISTER_NEW_USER,
} from "./auth.reducer";

export const loginUser = createAsyncThunk(
  LOG_IN_USER,
  async (username, password) => {
    const token = await fetchUserLoginToken(username, password);
    console.log(token);
    return token;
  }
);
export const loadUser = createAction(LOAD_USER_FROM_BROWSER);
export const logOutUSer = createAction(LOG_OUT_USER);
export const registerUser = createAsyncThunk(
  REGISTER_NEW_USER,
  async (username, password, email) => {
    const token = await fetchUserRegisterToken(username, password, email);
    return token;
  }
);
