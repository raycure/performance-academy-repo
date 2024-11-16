import axios from '../pages/api/axios.js';
import { API_BASE_URL } from '../config/serverApiConfig.js';
import { useDispatch } from 'react-redux';
import { fetchData } from '../redux/auth/authStateSlice.js';

export const AuthService =
	// data can be empty to include api calls like logout

		({ endpoint, data = {} }) =>
		async (dispatch) => {
			try {
				const response = await dispatch(
					fetchData({
						method: 'POST',
						url: `${endpoint}`,
						data: data,
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
