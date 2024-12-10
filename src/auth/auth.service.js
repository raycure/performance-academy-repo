import axios from '../pages/api/axios.js';
import { fetchData } from '../redux/auth/authStateSlice.js';

export const AuthService =
	// data can be empty to include api calls like logout


		({ endpoint, data = {}, method }) =>
		async (dispatch) => {
			// const navigate = useNavigate();
			try {
				const response = await dispatch(
					fetchData({
						method: method,
						url: `${endpoint}`,
						data: data,
					})
				);

				const isAccessTokenRefresh =
					response.payload.headers &&
					response.payload.headers['x-refreshed-token'];

				console.log('isAccessTokenRefresh', isAccessTokenRefresh);
				if (isAccessTokenRefresh) {
					let newAccessToken = response.payload.data.accessToken;
					localStorage.setItem('accessToken', newAccessToken);
				}
				if (fetchData.rejected.match(response)) {
					throw response || 'An unknown error occurred';
				}

				return response;
			} catch (error) {
				const isIpBlocked =
					error.payload.headers && error.payload.headers['ip-blocked'];
				if (isIpBlocked) {
					const ipBlockedEvent = new Event('ipBlockedEvent');
					window.dispatchEvent(ipBlockedEvent);
				}
				// console.log();
				return Promise.reject(error);
			}
		};
