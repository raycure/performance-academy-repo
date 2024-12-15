import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import Joi from 'joi';
import * as dotenv from 'dotenv';
dotenv.config();

const forgotPasswordController = async (req, res) => {
	try {
		const { token, newPassword } = req.body;

		if (!token) {
			return res.status(400).json({
				message: 'Verification token is missing',
			});
		}

		// todo add joi validation for password strength
		const loginSchema = Joi.object({
			newPassword: Joi.string().required(),
		});
		try {
			await loginSchema.validateAsync({
				newPassword,
			});
		} catch (validationError) {
			return res.status(400).json({
				success: false,
				message: validationError.details[0].message,
			});
		}

		// Verify the token using the mail token secret
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.MAIL_TOKEN_SECRET);
		} catch (verifyError) {
			return res.status(401).json({
				success: false,
				message:
					verifyError.name === 'TokenExpiredError'
						? 'Verification token has expired'
						: 'Invalid verification token',
			});
		}

		const foundUser = await Users.findById(decoded.userId);
		if (!foundUser) {
			return res.status(404).json({
				success: false,
				message: 'User not found',
			});
		}

		const hashedPassword = await hash(newPassword, 10);

		// Update user password
		await Users.findByIdAndUpdate(foundUser._id, { password: hashedPassword });

		res.status(200).json({
			success: true,
			message: 'Password successfully reset',
		});
	} catch (error) {
		// Log the error for server-side tracking
		console.error('Email verification error:', error);

		// Send a generic error response
		res.status(500).json({
			message: 'An unexpected error occurred during email verification',
		});
	}
};

export default forgotPasswordController;
