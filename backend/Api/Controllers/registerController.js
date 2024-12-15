import Users from '../Models/userModel.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import emailSender from './emailSender.js';
import Joi from 'joi';
import * as dotenv from 'dotenv';
dotenv.config();
import Sessions from '../Models/sessionModel.js';

const register = async (req, res) => {
	try {
		// todo add joi validation for password strength
		const { email, nationalID, name, surname } = req.body;
		const language = req.headers['language'];
		// const schema = Joi.object({
		// 	email: Joi.string().email().required(),
		// });
		// const { error } = await schema.validateAsync({ email });
		// if (error) {
		// 	return res.status(409).json({
		// 		success: false,
		// 		result: null,
		// 		error: error,
		// 		message: 'email format is incorrect',
		// 	});
		// }
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
			{ expiresIn: '4h' }
		);
		const verifyLink =
			process.env.EMAIL_ACTIVATION_LINK + '/' + emailVerifyToken;
		try {
			await emailSender(
				'verificationEmail',
				language,
				email,
				name,
				surname,
				verifyLink
			);
			// const response = await EmailSender(
			// 	'contactConfirmationEmail',
			// 	language,
			// 	email,
			// 	name,
			// 	surname
			// );
		} catch (error) {
			console.log(error);

			console.log('email couldnt been sent');
		}
		const accessToken = jwt.sign(
			{
				userId: userId,
				nationalID: nationalID,
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
			secure: process.env.ENVIRONMENT === 'development' ? 'false' : 'true',
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
			userId: userId,
			ip: clientIp,
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
