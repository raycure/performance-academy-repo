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

function setupAxiosDefaults() {
	const isBotAttempt = localStorage.getItem('botAttempt');
	if (isBotAttempt) {
		return null;
	}
	const accesstoken = localStorage.getItem('accessToken');
	if (accesstoken) {
		console.log('token does exist');
		axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
	} else {
		console.log('token doesnt exist');
		delete axios.defaults.headers.common['Authorization'];
	}

	const preferredLanguages = navigator.languages || [navigator.language];
	const primaryLanguage = preferredLanguages[0]; // Get the most preferred language
	axios.defaults.headers.common['Language'] = primaryLanguage;
}

export const fetchData = createAsyncThunk(
	'auth/fetchStatus',
	// data can be empty to include api calls like logout
	async ({ url, data = {}, method }, { rejectWithValue }) => {
		setupAxiosDefaults();
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
				if (action.payload.endpoint.includes('/logout')) {
					state.isLoggedIn = false;
				}
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoading = false;
				state.isSuccess = false;
				state.error = action.payload || 'An unknown error occurred';
			});
	},
});

const UserPreference = createSlice({
	name: 'UserPreference',
	initialState: initialStateForLang,
	reducers: {
		setPreferredLanguage: (state, action) => {
			const language = action.payload;
			state.preferredLanguage = action.payload;
			setupAxiosDefaults(language);
		},
	},
});

export const { setPreferredLanguage } = UserPreference.actions;
export const selectUserPreference = (state) =>
	state.UserPreference.preferredLanguage;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthIsSuccess = (state) => state.auth.isSuccess;
export const selectError = (state) => state.auth.error;
export const selectAuthState = (state) => state.auth;
export const userPreferenceReducer = UserPreference.reducer;
export default authSlice.reducer;
