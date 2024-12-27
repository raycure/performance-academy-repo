import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import * as dotenv from 'dotenv';
import validateInput from '../../Utils/validateInput.js';
import { passwordSchema } from '../../Utils/schemas/userSchema.js';
dotenv.config();

const forgotPasswordController = async (req, res) => {
	try {
		const { token, newPassword } = req.body;

		if (!token) {
			return res.status(400).json({
				message: res.__('forgotPasswordResponses.missingToken'),
			});
		}

		try {
			await validateInput({ password: newPassword }, passwordSchema);
		} catch (error) {
			console.log('error in the catch here: ', error);

			const trasnlatedErrorField = res.__(`${forgotPasswordForm.inputField}`);
			const trasnlatedMessage = res.__(`${error.message.errorMessage}`);
			console.log('trasnlatedErrorField:', trasnlatedErrorField);
			return res
				.status(422)
				.json({ message: trasnlatedErrorField + ' ' + trasnlatedMessage });
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
						? res.__('forgotPasswordResponses.expiredToken')
						: res.__('forgotPasswordResponses.invalidToken'),
			});
		}

		const foundUser = await Users.findById(decoded.userId);
		if (!foundUser) {
			return res.status(404).json({
				success: false,
				message: res.__('forgotPasswordResponses.userNotFound'),
			});
		}

		const hashedPassword = await hash(newPassword, 10);

		// Update user password
		await Users.findByIdAndUpdate(foundUser._id, { password: hashedPassword });

		res.status(200).json({
			success: true,
			message: res.__('forgotPasswordResponses.success'),
		});
	} catch (error) {
		res.status(500).json({
			message: res.__('serverError'),
		});
	}
};

export default forgotPasswordController;
