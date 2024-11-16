import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './auth/authStateSlice.js';
import programIdReducer from './Slices/ProgramIdSlice.js';
import calendarEventReducer from './Slices/CalendarEventSlice.js';
import * as authService from '../auth/auth.service.js';

const programIdPersistConfig = {
	key: 'selectedProgramId',
	storage,
};

const persistedProgramIdReducer = persistReducer(
	programIdPersistConfig,
	programIdReducer
);

const authPersistConfig = {
	key: 'auth',
	storage,
	whitelist: ['isLoggedIn'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		selectedProgramId: persistedProgramIdReducer,
		calendarSelectedEventId: calendarEventReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: { extraArgument: authService },
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export default store;
