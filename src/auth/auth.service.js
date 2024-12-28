import axios from '../pages/api/axios.js';
import { fetchData } from '../redux/auth/authStateSlice.js';
import {
	successHandler,
	errorHandler,
} from '../components/Notification/Handlers.js';

export const AuthService =
	// data can be empty to include api calls like logouts


		({ endpoint, data = {}, method }) =>
		async (dispatch) => {
			try {
				const response = await dispatch(
					fetchData({
						method: method,
						url: `${endpoint}`,
						data: data,
					})
				);

				console.log('response in service', response);

				const isAccessTokenRefresh =
					response.payload?.headers &&
					response.payload?.headers['x-refreshed-token'];

				if (isAccessTokenRefresh) {
					console.log('token refreshed');
					let newAccessToken = response.payload.data.accessToken;
					console.log('newAccessToken', newAccessToken);
					localStorage.setItem('accessToken', newAccessToken);
				}
				if (fetchData.rejected.match(response)) {
					throw response || 'An unknown error occurred';
				}
				if (response.payload.data.notify) {
					successHandler(response);
				}
				return response;
			} catch (error) {
				console.log('error in service', error);
				const isIpBlocked =
					error.payload?.headers && error.payload?.headers['ip-blocked'];
				if (isIpBlocked) {
					const ipBlockedEvent = new Event('ipBlockedEvent');
					window.dispatchEvent(ipBlockedEvent);
				}
				if (error.payload.data) {
					return errorHandler(error);
				}
				return Promise.reject(error);
			}
		};
