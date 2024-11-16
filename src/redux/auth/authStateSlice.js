import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../pages/api/axios.js';

const initialState = {
	current: {},
	isLoggedIn: false,
	status: 'idle',
	isLoading: false,
	isSuccess: false,
	error: null,
};

function test() {
	const setupAxiosDefaults = (token) => {
		if (token) {
			console.log('token does exist');
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		} else {
			console.log('token doesnt exist');
			delete axios.defaults.headers.common['Authorization'];
		}
		axios.defaults.withCredentials = true;
	};

	const savedToken = localStorage.getItem('accessToken');

	if (savedToken) {
		setupAxiosDefaults(savedToken);
	}
}

export const fetchData = createAsyncThunk(
	'auth/fetchStatus',
	// data can be empty to include api calls like logout
	async ({ method, url, data = {} }, { rejectWithValue }) => {
		test();
		axios.defaults.withCredentials = true;
		try {
			// spreads the config argument for it to work properly
			const response = await axios({ method, url, data });
			return {
				data: response.data,
				endpoint: url,
			};
		} catch (error) {
			const responseData = {
				data: error.response?.data,
				status: error.response?.status,
			};
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
				state.current = action.payload.data;
				if (action.payload.endpoint.includes('/login')) {
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

export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthIsSuccess = (state) => state.auth.isSuccess;
export const selectError = (state) => state.auth.error;
export const selectAuthState = (state) => state.auth;
export default authSlice.reducer;
