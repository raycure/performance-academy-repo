import Users from '../Models/userModel.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import emailSender from './emailSender.js';
import * as dotenv from 'dotenv';
dotenv.config();
import Sessions from '../Models/sessionModel.js';
import validateInput from '../../Utils/validateInput.js';
import { registerSchemas } from '../../Utils/schemas/userSchema.js';

const register = async (req, res) => {
	try {
		const { email, nationalID, name, surname, password } = req.body;
		const language = req.headers['language'];
		const registerData = { name, nationalID, surname, password, email };

		const existingUser = await Users.findOne({
			$or: [{ email }, { nationalID }],
		});

		if (existingUser) {
			if (existingUser.email === email) {
				return res.status(409).json({
					success: false,
					result: null,
					message: res.__('registerResponses.duplicateEmail'),
				});
			}

			if (existingUser.nationalID === nationalID) {
				return res.status(409).json({
					success: false,
					result: null,
					message: res.__('registerResponses.duplicateNationalId'),
				});
			}
		}
		try {
			validateInput(registerData, registerSchemas);
		} catch (error) {
			const trasnlatedMessage = res.__(`${error.message.errorMessage}`);
			const trasnlatedErrorField = res.__(`${error.message.errorField}`);

			return res
				.status(422)
				.json({ message: trasnlatedErrorField + ' ' + trasnlatedMessage });
		}

		const hashedPassword = await hash(password, 10);
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

		const activationLink =
			process.env.ENVIRONMENT === 'development'
				? process.env.DEV_EMAIL_CONFIRMATION_LINK
				: process.env.PROD_EMAIL_CONFIRMATION_LINK;
		const verifyLink = activationLink + '/' + emailVerifyToken;

		try {
			await emailSender(
				'verificationEmail',
				language,
				email,
				name,
				surname,
				verifyLink
			);
		} catch (error) {
			console.log('error at sending email', error);
		}
		const accessToken = jwt.sign(
			{
				userId: userId,
				nationalID: nationalID,
				email: email,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);
		const refreshToken = jwt.sign(
			{
				userId: userId,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '365d' }
		);
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
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
		await Sessions.create({
			refreshToken: refreshToken,
			userId: userId,
			ip: clientIp,
		});

		res.status(200).json({
			accessToken: accessToken,
			message: res.__('registerResponses.success'),
			notify: true,
		});
	} catch (error) {
		res.status(500).json({ message: res.__('serverError') });
	}
};

export default register;
