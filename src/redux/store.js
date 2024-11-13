import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authStateSlice.js';
import * as authService from '../auth/auth.service.js';

const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: authService,
			},
		}),
});

export default store;
