import Users from '../Models/userModel.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import EmailSender from './emailSender.js';
import * as dotenv from 'dotenv';
dotenv.config();
import Sessions from '../Models/sessionModel.js';

const register = async (req, res) => {
	try {
		const { email } = req.body;
		const existingUser = await Users.findOne({ email });
		if (existingUser) {
			return res.status(409).json({
				success: false,
				result: null,
				message: 'Email already in use.',
			});
		}

		const hashedPassword = await hash(req.body.password, 10);
		req.body.password = hashedPassword;
		const newUser = await Users.create(req.body);
		const userId = new ObjectId(newUser).toHexString();

		const emailVerifyToken = jwt.sign(
			{
				userId: userId,
			},
			process.env.MAIL_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);
		const verifyLink = process.env.ACTIVATION_LINK + '/' + emailVerifyToken;
		try {
			await EmailSender(verifyLink, email);
		} catch (error) {
			console.log('email couldnt been sent');
		}
		const accessToken = jwt.sign(
			{
				userId: userId,
				email: email,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '3s' } //todo change it
		);
		const refreshToken = jwt.sign(
			{
				userId: userId,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '5m' } //todo change it
		);
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			// maxAge: 1000 * 3, //todo delete it
			sameSite: 'Lax',
			path: '/',
			secure: process.env.ENVIROMENT === 'development' ? 'false' : 'true',
		});
		const addActiveUser = await Sessions.create({
			token: refreshToken,
			userId: userId,
			// expiresAt: new Date(Date.now() + 30 * 1000), // 7 days from now
		});
		res.status(200).json({
			accessToken: accessToken,
			message: 'Successfully login user',
		});

		// todo response with the users id nothing else ig.
	} catch (error) {
		console.log('error', error);

		res.status(500).json({ message: 'Internal server error.' });
	}
};

export default register;

// lacks every other data but now accept only actual valid email adresses

// import Users from '../Models/userModel.js';
// import pkg from 'bcryptjs';
// const { hash, compare } = pkg;
// import jwt from 'jsonwebtoken';
// import { ObjectId } from 'mongodb';
// import EmailSender from './emailSender.js';
// import * as dotenv from 'dotenv';
// dotenv.config();
// import Joi from 'joi';
// import Sessions from '../Models/sessionModel.js';

// const register = async (req, res) => {
// 	try {
// 		const { email } = req.body;
// 		const schema = Joi.object({
// 			email: Joi.string().email().required(),
// 		});
// 		const { error } = await schema.validateAsync({ email });
// 		if (error) {
// 			return res.status(409).json({
// 				success: false,
// 				result: null,
// 				error: error,
// 				message: 'email format is incorrect',
// 			});
// 		}
// 		const existingUser = await Users.findOne({ email });
// 		if (existingUser) {
// 			return res.status(409).json({
// 				success: false,
// 				result: null,
// 				message: 'Email already in use.',
// 			});
// 		}

// 		const hashedPassword = await hash(req.body.password, 10);
// 		req.body.password = hashedPassword;
// 		const newUser = await Users.create(req.body);
// 		const userId = new ObjectId(newUser).toHexString();

// 		const emailVerifyToken = jwt.sign(
// 			{
// 				userId: userId,
// 			},
// 			process.env.MAIL_TOKEN_SECRET,
// 			{ expiresIn: '1d' }
// 		);
// 		const verifyLink = process.env.ACTIVATION_LINK + '/' + emailVerifyToken;
// 		try {
// 			await EmailSender(verifyLink, email);
// 		} catch (error) {
// 			console.log('email couldnt been sent');
// 		}
// 		const accessToken = jwt.sign(
// 			{
// 				userId: userId,
// 				email: email,
// 			},
// 			process.env.ACCESS_TOKEN_SECRET,
// 			{ expiresIn: '3s' } //todo change it
// 		);
// 		const refreshToken = jwt.sign(
// 			{
// 				userId: userId,
// 			},
// 			process.env.REFRESH_TOKEN_SECRET,
// 			{ expiresIn: '5m' } //todo change it
// 		);
// 		res.cookie('jwt', refreshToken, {
// 			httpOnly: true,
// 			maxAge: 1000 * 60 * 60 * 24 * 30,
// 			// maxAge: 1000 * 3, //todo delete it
// 			sameSite: 'Lax',
// 			path: '/',
// 			secure: process.env.ENVIROMENT === 'development' ? 'false' : 'true',
// 		});
// 		const addActiveUser = await Sessions.create({
// 			token: refreshToken,
// 			userId: userId,
// 			// expiresAt: new Date(Date.now() + 30 * 1000), // 7 days from now
// 		});
// 		res.status(200).json({
// 			accessToken: accessToken,
// 			message: 'Successfully login user',
// 		});

// 		// todo response with the users id nothing else ig.
// 	} catch (error) {
// 		console.log('error', error);

// 		res.status(500).json({ message: 'Internal server error.' });
// 	}
// };

// export default register;
