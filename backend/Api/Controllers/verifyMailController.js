import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

import * as dotenv from 'dotenv';
dotenv.config();

const verifyMail = async (req, res) => {
	try {
		const { token } = req.params;
		// Validate token existence
		if (!token) {
			return res.status(400).json({
				message: res.__('verifyMailResponses.missingToken'),
			});
		}

		// Verify the token using the mail token secret
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.MAIL_TOKEN_SECRET);
		} catch (verifyError) {
			if (verifyError.name === 'TokenExpiredError') {
				return res.status(401).json({
					// message: 'Verification token has expired',
					message:
						verifyError.name === 'TokenExpiredError'
							? res.__('verifyMailResponses.expiredToken')
							: res.__('verifyMailResponses.invalidToken'),
				});
			}
			throw verifyError;
		}

		// Find and update the user
		const result = await Users.updateOne(
			{ _id: new ObjectId(decoded.userId) },
			{ $set: { verifiedMail: true } }
		);

		// Check if the update was successful
		if (result.matchedCount === 0) {
			return res.status(404).json({
				message: res.__('verifyMailResponses.userNotFound'),
			});
		}
		res.redirect('http://localhost:5173/login');
	} catch (error) {
		res.status(500).json({
			message: res.__('serverError'),
		});
	}
};

export default verifyMail;
