import Users from '../Models/userModel.js';
import Joi from 'joi';
import mongoose from 'mongoose';
import emailSender from './emailSender.js';
import jwt from 'jsonwebtoken';

import * as dotenv from 'dotenv';
dotenv.config();

const sendForgotPasswordEmail = async (req, res) => {
	try {
		const language = req.headers['language'] || 'en';

		const { email, nationalID } = req.body;
		const loginSchema = Joi.object({
			email: Joi.string().email().optional(),
			nationalID: Joi.string().optional(),
		}).xor('email', 'nationalID');
		try {
			await loginSchema.validateAsync({
				...(email && { email }),
				...(nationalID && { nationalID }),
			});
		} catch (validationError) {
			console.log(validationError);
			return res.status(400).json({
				success: false,
				message: validationError.details[0].message,
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
				message: 'No account found with provided credentials.',
			});
		}

		const name = foundUser.name;
		const surname = foundUser.surname;
		const userId = foundUser._id;
		// if the user gave their id pull the email adress from the found user
		const userEmailAddress = !email ? foundUser.email : email;

		const emailVerificationToken = jwt.sign(
			{
				userId: userId,
			},
			process.env.MAIL_TOKEN_SECRET,
			{ expiresIn: '4h' }
		);
		const forgotPasswordLink =
			process.env.EMAIL_FORGOTPASSWORD_LINK + '/' + emailVerificationToken;
		console.log('forgotPasswordVerificationLink', forgotPasswordLink);

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
				message: 'Password reset link sent successfully.',
				notify: true,
			});
		} catch (emailError) {
			console.error('Email sending error:', emailError);
			return res.status(500).json({
				success: false,
				message: 'Failed to send password reset email.',
			});
		}
	} catch (error) {
		console.error('Forgot password error:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error.',
		});
	}
};

export default sendForgotPasswordEmail;
