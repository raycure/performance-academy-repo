import Users from '../Models/userModel.js';
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import Sessions from '../Models/sessionModel.js';
import { loginSchema } from '../../Utils/schemas/userSchema.js';

const login = async (req, res) => {
	try {
		const { email, nationalID, password } = req.body;
		// only one of the two is required
		try {
			await loginSchema.validateAsync({
				...(email && { email }),
				...(nationalID && { nationalID }),
				password,
			});
		} catch (validationError) {
			return res.status(400).json({
				success: false,
				message: res.__(validationError.details[0].message),
			});
		}

		// Build query based on which identifier is provided
		const query = {
			blocked: false,
			...(email && { email }),
			...(nationalID && { nationalID }),
		};

		const user = await Users.findOne(query);
		if (!user) {
			return res.status(404).json({
				success: false,
				result: null,
				message: res.__('loginResponses.accountNotFound'),
			});
		}

		const isMatch = await pkg.compare(password, user.password);

		if (!isMatch) {
			return res.status(403).json({
				success: false,
				result: null,
				message: res.__('loginResponses.invalidCredentials'),
			});
		}

		const accessToken = jwt.sign(
			{
				userId: user._id,
				email: user.email,
				nationalID: user.nationalID,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);

		const refreshToken = jwt.sign(
			{
				userId: user._id,
				...(nationalID && { nationalID }),
				...(email && { email }),
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '365d' }
		);

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			sameSite: 'Lax',
			path: '/',
			secure: process.env.ENVIRONMENT === 'development' ? false : true,
		});

		const clientIp = (
			req.headers['x-forwarded-for'] ||
			req.ip ||
			req.connection.remoteAddress ||
			''
		)
			.split(',')[0]
			.trim();

		// addActiveUser
		await Sessions.create({
			refreshToken: refreshToken,
			userId: user._id,
			ip: clientIp,
		});

		return res.status(200).json({
			accessToken: accessToken,
			message: res.__('loginResponses.success'),
		});
	} catch (error) {
		console.log('error', error);

		return res.status(500).json({
			success: false,
			result: null,
			error: error,
			message: res.__('serverError'),
		});
	}
};

const admingLogin = async (req, res) => {
	try {
		const { adminUsername, password } = req.body;
		const surname = 'a';

		console.log('adminUsername: ', adminUsername);
		console.log('password: ', password);

		const user = await Users.findOne({ surname: surname });

		if (!user) {
			return res.status(404).json({
				message: 'No bitches found',
			});
		}
		let databaseUserCreds = await Users.findOne({
			_id: user._id,
		});

		const isPasswordMatch = await pkg.compare(
			password,
			databaseUserCreds.password
		);
		const isUsernameMatch = await pkg.compare(
			adminUsername,
			databaseUserCreds.name
		);

		if (!isPasswordMatch || !isUsernameMatch) {
			return res.status(403).json({
				message: '¿Estás tratando de joderme?',
			});
		}

		return res.status(200).json({
			message: 'im in',
		});
	} catch (error) {
		console.log('kurwaaaa server down', error);
		return res.status(500).json({
			message: 'kurwaaaa server down',
			error: 'error',
		});
	}
};

export { admingLogin, login };
