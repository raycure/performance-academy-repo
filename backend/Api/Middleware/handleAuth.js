import verifyJWT from './verifyJWT.js';
import refreshJwt from '../Controllers/refreshJwt.js';

const authMiddleware = async (req, res, next) => {
	try {
		// Create a mock response object to capture verifyJWT's response
		const mockRes = {
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.responseData = data;
				return this;
			},
		};

		// Call verifyJWT with req and mock response
		await verifyJWT(req, mockRes);

		// Check the response from verifyJWT
		if (mockRes.statusCode === 200) {
			req.user = mockRes.responseData.returnedValue;
			req.isAuthenticated = true; // Mark user as authenticated
			return next();
		}

		// If verification failed, try refresh
		const refreshMockRes = {
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.responseData = data;
				return this;
			},
		};

		console.log('gonna refresh');

		await refreshJwt(req, refreshMockRes);

		if (refreshMockRes.statusCode === 200) {
			req.user = refreshMockRes.responseData.returnedValue;
			req.isAuthenticated = true;
			return next();
		}

		req.isAuthenticated = false;
		req.user = null;
		return next();
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default authMiddleware;
