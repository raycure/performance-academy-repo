import verifyJWT from './verifyJWT.js';
import Users from '../Models/userModel.js';
import { ObjectId } from 'mongodb';
import refreshJwt from '../Controllers/refreshJwt.js';
import Sessions from '../Models/sessionModel.js';
import jwt from 'jsonwebtoken';
import handleLogout from '../Controllers/logoutController.js';
const authMiddleware = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.jwt;
		if (!refreshToken) {
			return res.status(403).json({
				message: res.__('authResponses.noSession'),
				authFailure: true,
			});
		}

		let decodedToken;
		try {
			decodedToken = jwt.decode(refreshToken);
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		} catch (decodeError) {
			await handleLogout(req, res, true);
			return res.status(403).json({
				message: res.__('authResponses.noSession'),
				authFailure: true,
			});
		}

		const userIdFromToken = decodedToken.userId;

		const foundActiveSession = await Sessions.findOne({
			userId: new ObjectId(userIdFromToken),
		});

		if (!foundActiveSession) {
			await handleLogout(req, res, true);

			return res.status(404).json({
				message: res.__('authResponses.noSession'),
				authFailure: true,
			});
		}
		const foundUser = await Users.findOne({
			_id: new ObjectId(userIdFromToken),
		});

		if (!foundUser) {
			await handleLogout(req, res, true);

			return res.status(404).json({
				message: res.__('authResponses.userNotFound'),
				authFailure: true,
			});
		}

		if (foundUser.blocked) {
			await handleLogout(req, res, true);

			return res.status(403).json({
				message: res.__('authResponses.accountSuspended'),
				authFailure: true,
			});
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
		const authHeader = req.headers['authorization'];
		if (!authHeader) {
			return res.status(401).json({ message: 'Token is missing or invalid' });
		}
		const accessToken = authHeader.split(' ')[1];
		req.accessToken = accessToken;

		console.log('gonna verify');
		await verifyJWT(req, verifyJwtMockResponse);
		// Check the response from verifyJWT
		if (verifyJwtMockResponse.statusCode === 200) {
			req.userId = userIdFromToken;
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
			res.header('x-refreshed-token', 'true');
			req.isAuthenticated = true;
			req.accessToken = refreshMockRes.responseData.newAccessToken;
			req.userId = userIdFromToken;
			return next();
		}

		if (refreshMockRes.statusCode === 403) {
			const errorMsg = refreshMockRes.responseData.message;
			return res.status(403).json({ message: res.__(`${errorMsg}`) });
		}

		req.isAuthenticated = false;
		req.accessToken = null;
		req.userId = null;
		return next();
	} catch (error) {
		console.log('error at authMiddleware', error);
		await handleLogout(req, res, true);
		return res.status(500).json({ message: res.__('serverError') });
	}
};

export default authMiddleware;
