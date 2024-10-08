import axios from '../pages/api/axios.js';
import { API_BASE_URL } from '../config/serverApiConfig.js';
import { useDispatch } from 'react-redux';
import { fetchData } from '../redux/auth/authStateSlice.js';

export const register =
	({ registerData }) =>
	async (dispatch) => {
		try {
			const response = await dispatch(
				fetchData({
					method: 'POST',
					url: '/register',
					data: registerData,
				})
			);
			if (fetchData.rejected.match(response)) {
				throw response || 'An unknown error occurred';
			}
			return response;
		} catch (error) {
			console.log('response authta:', error);
			return Promise.reject(error);
		}
	};

export const login =
	({ loginData }) =>
	async (dispatch) => {
		try {
			const response = await dispatch(
				fetchData({
					method: 'POST',
					url: '/login',
					data: loginData,
				})
			);
			if (fetchData.rejected.match(response)) {
				throw response || 'An unknown error occurred';
			}
			return response;
		} catch (error) {
			console.log('response authta catchte:', error);
			return Promise.reject(error);
		}
	};
