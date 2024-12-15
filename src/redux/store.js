import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './auth/authStateSlice.js';
import programIdReducer from './Slices/ProgramIdSlice.js';
import calendarEventReducer from './Slices/CalendarEventSlice.js';
import * as authService from '../auth/auth.service.js';
import { userPreferenceReducer } from './auth/authStateSlice.js';

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

const userPreferencePersistConfig = {
	key: 'UserPreference',
	storage,
	whitelist: ['preferredLanguage'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUserPreferenceReduscer = persistReducer(
	userPreferencePersistConfig,
	userPreferenceReducer
);

const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		selectedProgramId: persistedProgramIdReducer,
		UserPreference: persistedUserPreferenceReduscer,
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
