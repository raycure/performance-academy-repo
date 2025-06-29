import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../pages/api/axios.js';

const initialState = {
	deviceId: null,
	isLoggedIn: false,
	status: 'idle',
	isLoading: false,
	isSuccess: false,
	error: null,
};

const initialStateForLang = {
	preferredLanguage: null,
};

async function setupAxiosDefaults() {
	const isBotAttempt = localStorage.getItem('botAttempt');
	if (isBotAttempt) {
		return null;
	}

	if (!axios.defaults.headers.common['Accept-Language']) {
		axios.defaults.headers.common['Accept-Language'] = 'tr';
	}

	const accesstoken = localStorage.getItem('accessToken');
	if (accesstoken) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

export const fetchData = createAsyncThunk(
	'auth/fetchStatus',
	// data can be empty to include api calls like logout
	async ({ url, data = {}, method }, { rejectWithValue }) => {
		await setupAxiosDefaults();
		try {
			const response = await axios({
				url,
				data,
				method: method,
			});
			console.log('response in slice', response);

			return {
				data: response.data,
				status: response.status,
				headers: response?.headers,
				endpoint: url,
			};
		} catch (error) {
			console.log('error in slice', error);
			const responseData = {
				data: error.response?.data,
				status: error.response?.status,
				headers: error.response?.headers,
				endpoint: url,
			};
			console.log('error in slice', error);
			return rejectWithValue(responseData);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = 'loading';
				state.isLoading = true;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isLoading = false;
				state.isSuccess = true;
				if (
					action.payload.endpoint.includes('/login') ||
					action.payload.endpoint.includes('/register')
				) {
					state.isLoggedIn = true;
				}
				if (
					action.payload.endpoint.includes('/logout') ||
					action.payload.endpoint.includes('/userInfo/deleteAccount')
				) {
					state.isLoggedIn = false;
				}
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoading = false;
				state.isSuccess = false;
				if (action.payload.data.authFailure) {
					state.isLoggedIn = false;
				}
				state.error = action.payload || 'An unknown error occurred';
			});
	},
});

const UserPreference = createSlice({
	name: 'UserPreference',
	initialState: initialStateForLang,
	reducers: {
		// setPreferredLanguage: (state, action) => {
		// 	state.preferredLanguage = action.payload;
		// 	const language = action.payload;
		// 	axios.defaults.headers.common['Accept-Language'] = action.payload;
		// },
	},
});

export const setPreferredLanguage = createAsyncThunk(
	'language/setPreferredLanguage',
	async (language) => {
		axios.defaults.headers.common['Accept-Language'] = language;
		return language;
	}
);

// export const { setPreferredLanguage } = UserPreference.actions;
export const selectUserPreference = (state) =>
	state.UserPreference.preferredLanguage;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthIsSuccess = (state) => state.auth.isSuccess;
export const selectError = (state) => state.auth.error;
export const selectAuthState = (state) => state.auth;
export const userPreferenceReducer = UserPreference.reducer;
export default authSlice.reducer;
