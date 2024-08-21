// import { configureStore } from "@reduxjs/toolkit";




// const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });


import { configureStore } from "@reduxjs/toolkit";
import * as ApiService from "../../Api/Controllers/productController.js"

import rootReducer from "./rootReducer";
const AUTH_INITIAL_STATE = {
  current: {},
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: ApiService,
      },
    }),
});

export default store;

