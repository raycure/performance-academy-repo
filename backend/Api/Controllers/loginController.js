import Users from '../Models/userModel.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import Sessions from '../Models/sessionModel.js';

const login = async (req, res) => {
	try {
		const { email, nationalID, password } = req.body;

		// only one of the two is required both cant be required

		const loginSchema = Joi.object({
			email: Joi.string().email().optional(),
			nationalID: Joi.string().optional(),
			password: Joi.string().required(),
		}).xor('email', 'nationalID');
		// The .xor('email', 'nationalID') is crucial - it means EXACTLY ONE of email or nationalID must be present, but not both
		try {
			await loginSchema.validateAsync({
				...(email && { email }),
				...(nationalID && { nationalID }),
				password,
			});
		} catch (validationError) {
			return res.status(400).json({
				success: false,
				message: validationError.details[0].message,
			});
		}

		// Build query based on which identifier is provided
		const query = {
			blocked: false,
			...(email && { email }),
			...(nationalID && { nationalID }),
		};

		console.log('email in login controller', email);
		console.log('nationalID in login controller', nationalID);
		console.log('password in login controller', password);
		console.log('quert', query);

		const user = await Users.findOne(query);

		console.log('quert', user);
		if (!user) {
			return res.status(404).json({
				success: false,
				result: null,
				message: 'No account found with provided credentials.',
			});
		}

		const isMatch = await pkg.compare(password, user.password);

		if (!isMatch) {
			return res.status(403).json({
				success: false,
				result: null,
				message: 'Invalid credentials.',
			});
		}

		const accessToken = jwt.sign(
			{
				userId: user._id,
				email: user.email,
				nationalID: user.nationalID,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '10s' } //todo change it
		);

		const refreshToken = jwt.sign(
			{
				userId: user._id,
				...(nationalID && { nationalID }),
				...(email && { email }),
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '10d' } //todo change it
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
		const addActiveUser = await Sessions.create({
			refreshToken: refreshToken,
			userId: user._id,
			ip: clientIp,
		});

		// todo decide if i should retunr the user or nah
		return res.status(200).json({
			accessToken: accessToken,
			message: 'Successfully login user',
		});
	} catch (error) {
		console.log('error', error);

		return res.status(500).json({
			success: false,
			result: null,
			error: error,
			message: 'An error occurred during login',
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
