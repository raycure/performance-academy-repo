import Users from '../Models/userModel.js';
import Joi from 'joi';
import emailSender from './emailSender.js';
import jwt from 'jsonwebtoken';
import { requestNewMailSchema } from '../../Utils/schemas/userSchema.js';
import * as dotenv from 'dotenv';
dotenv.config();

const sendForgotPasswordEmail = async (req, res) => {
	try {
		const language = req.headers['language'] || 'en';

		const { email, nationalID } = req.body;
		try {
			await requestNewMailSchema.validateAsync({
				...(email && { email }),
				...(nationalID && { nationalID }),
			});
		} catch (error) {
			const trasnlatedErrorField = !email
				? res.__('forgotPasswordForm.invalidNationalId')
				: res.__('forgotPasswordForm.invalidEmail');

			return res.status(422).json({
				message: trasnlatedErrorField,
				duration: 100000,
			});
		}
		const query = {
			blocked: false,
			...(email && { email }),
			...(nationalID && { nationalID }),
		};

		const foundUser = await Users.findOne(query);

		if (!foundUser) {
			return res.status(404).json({
				success: false,
				result: null,
				message: res.__('loginResponses.accountNotFound'),
			});
		}

		const userId = foundUser._id;
		// if the user gave their id pull the email adress from the found user
		const userEmailAddress = !email ? foundUser.email : email;

		const emailToken = jwt.sign(
			{
				userId: userId,
			},
			process.env.MAIL_TOKEN_SECRET,
			{ expiresIn: '4h' }
		);

		const envBasedForgotPasswordLink =
			process.env.ENVIRONMENT === 'development'
				? process.env.DEV_RESET_PASSWORD_LINK
				: process.env.PROD_RESET_PASSWORD_LINK;

		const forgotPasswordLink = envBasedForgotPasswordLink + '/' + emailToken;

		try {
			// Send password reset email
			await emailSender(
				'forgotPasswordEmail',
				language,
				userEmailAddress,
				foundUser.name,
				foundUser.surname,
				forgotPasswordLink
			);

			// Respond with success message
			return res.status(200).json({
				success: true,
				message: res.__('sendForgotPasswordEmailResponses.success'),
				notify: true,
			});
		} catch (emailError) {
			console.error('Email sending error:', emailError);
			return res.status(500).json({
				success: false,
				message: res.__('sendForgotPasswordEmailResponses.error'),
			});
		}
	} catch (error) {
		console.error('Forgot password error:', error);
		return res.status(500).json({
			success: false,
			message: res.__('serverError'),
		});
	}
};

export default sendForgotPasswordEmail;
