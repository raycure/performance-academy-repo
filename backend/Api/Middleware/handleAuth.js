import verifyJWT from './verifyJWT.js';
import Users from '../Models/userModel.js';
import { ObjectId } from 'mongodb';
import refreshJwt from '../Controllers/refreshJwt.js';
import Sessions from '../Models/sessionModel.js';
import jwt from 'jsonwebtoken';
const authMiddleware = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.jwt;
		if (!refreshToken) {
			return res.status(401).json({ message: 'Login Required' });
		}

		let decodedToken;
		try {
			decodedToken = jwt.decode(refreshToken);
		} catch (decodeError) {
			return res.status(403).json({
				message: 'Invalid token. Please log out and log back in.',
			});
		}
		const userIdFromToken = decodedToken.userId;

		const foundActiveSession = await Sessions.findOne({
			userId: new ObjectId(userIdFromToken),
		});

		if (!foundActiveSession) {
			return res.status(404).json({ message: 'no active session' });
		}
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
			req.userId = verifyJwtMockResponse.responseData.accessToken;
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
			req.userId = refreshMockRes.responseData.accessToken;
			return next();
		}

		req.isAuthenticated = false;
		req.user = null;
		req.userId = null;
		return next();
	} catch (error) {
		console.log('error', error);

		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default authMiddleware;
