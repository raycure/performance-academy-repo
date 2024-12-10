import verifyJWT from './verifyJWT.js';
import Users from '../Models/userModel.js';
import { ObjectId } from 'mongodb';
import refreshJwt from '../Controllers/refreshJwt.js';
import jwt from 'jsonwebtoken';
const authMiddleware = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.jwt;
		if (!refreshToken) {
			return res.status(401).json({ message: 'Login Required' });
		}

		const decodedToken = jwt.decode(refreshToken);
		const userIdFromToken = decodedToken.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userIdFromToken),
		});
		if (!foundUser) {
			return res.status(404).json({
				message: 'no user found',
			});
		}

		if (foundUser.blocked) {
			return res
				.status(403)
				.json({ message: 'your account has been suspended' });
		}

		// Create a mock response object to capture verifyJWT's response
		const verifyJwtMockResponse = {
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
		await verifyJWT(req, verifyJwtMockResponse);

		// Check the response from verifyJWT
		if (verifyJwtMockResponse.statusCode === 200) {
			req.user = verifyJwtMockResponse.responseData.returnedValue;
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
			res.header('x-refreshed-token', 'true');
			req.isAuthenticated = true;
			return next();
		}

		req.isAuthenticated = false;
		req.user = null;
		return next();
	} catch (error) {
		console.log('error', error);

		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default authMiddleware;
