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
import { useTranslation } from 'react-i18next';
import validateInput from '../../Utils/validateInput.js';
import { registerSchemas } from '../../Utils/schemas/userSchema.js';

const register = async (req, res) => {
	try {
		// todo add joi validation for password strength
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
					message: 'Email already in use.',
				});
			}

			if (existingUser.nationalID === +nationalID) {
				return res.status(409).json({
					success: false,
					result: null,
					message: 'National ID already in use.',
				});
			}
		}
		try {
			validateInput(registerData, registerSchemas);
		} catch (error) {
			return res.status(422).json({ message: error.message });
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
	} catch (error) {
		console.log('error in the last catc', error);
		res.status(500).json({ message: 'Internal server error.' });
	}
};

export default register;
