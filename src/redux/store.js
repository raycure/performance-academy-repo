import { configureStore } from "@reduxjs/toolkit";
import * as authService from "../auth/auth.service"
import rootReducer from "./rootReducer";
const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: authService,
      },
    }),
});

export default store;