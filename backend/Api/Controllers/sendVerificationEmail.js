import jwt from 'jsonwebtoken';
import emailSender from './emailSender.js';
import * as dotenv from 'dotenv';
dotenv.config();
import Users from '../Models/userModel.js';

async function sendVerificationEmail(req, res) {
	const language = req.headers['language'];
	const { name, surname, email } = req.body;
	const foundUser = await Users.findOne({ email });
	const userId = foundUser._id;

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
		res.status(500).json({
			message: res.__('verificationEmailResponses.error'),
			duration: 7000,
		});
	}
	res.status(200).json({
		notify: true,
		accessToken: req.accessToken,
		message: res.__('verificationEmailResponses.success'),
	});
}

export default sendVerificationEmail;
