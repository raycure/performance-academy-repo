import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import * as dotenv from 'dotenv';
dotenv.config();

const verifyMail = async (req, res) => {
	try {
		const { token } = req.params;
		console.log('verify tokeni', token);

		// Validate token existence
		if (!token) {
			return res.status(400).json({
				message: 'Verification token is missing',
			});
		}

		// Verify the token using the mail token secret
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.MAIL_TOKEN_SECRET);
		} catch (verifyError) {
			if (verifyError.name === 'TokenExpiredError') {
				return res.status(401).json({
					message: 'Verification token has expired',
				});
			}
			if (verifyError.name === 'JsonWebTokenError') {
				return res.status(401).json({
					message: 'Invalid verification token',
				});
			}
			throw verifyError;
		}

		// Validate userId in the decoded token
		if (!decoded.userId) {
			return res.status(400).json({
				message: 'Invalid token payload',
			});
		}

		// Find and update the user
		const result = await Users.updateOne(
			{ _id: new ObjectId(decoded.userId) },
			{ $set: { verifiedMail: true } }
		);

		// Check if the update was successful
		if (result.matchedCount === 0) {
			return res.status(404).json({
				message: 'User not found',
			});
		}

		// Redirect to login page on successful verification
		// todo add prod link
		res.redirect('http://localhost:5173/login');
	} catch (error) {
		// Log the error for server-side tracking
		console.error('Email verification error:', error);

		// Send a generic error response
		res.status(500).json({
			message: 'An unexpected error occurred during email verification',
		});
	}
};

export default verifyMail;
