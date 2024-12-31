import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import VerificationEmail from '../../assets/emails/verificationEmail.js';
import ForgotEmail from '../../assets/emails/forgotPasswordEmail.js';
import contactConfirmationEmail from '../../assets/emails/contactConfirmationEmail.js';
import PurchaseConfirmationEmail from '../../assets/emails/confirmPurchaseEmail.js';
import React from 'react';

const emailSender = async (
	emailType,
	language,
	userEmailAdress,
	name,
	surname,
	url,
	emailProps
) => {
	const {
		program = null,
		startDate = null,
		endDate = null,
		online = null,
		location = null,
	} = emailProps || {};

	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: false,
			auth: {
				user: 'mae1@ethereal.email',
				pass: 'Ay1VH761Dr6AKQgSf5',
			},
		});

		let emailHtml;
		let options;
		switch (emailType) {
			case 'verificationEmail':
				// Await the render to get the HTML string
				emailHtml = await render(
					React.createElement(VerificationEmail, {
						name,
						surname,
						verificationLink: url,
						language: language,
					})
				);
				options = {
					from: 'you@example.com',
					to: `${userEmailAdress}`,
					subject:
						language === 'tr' ? 'Doğrulama E-postası' : 'Verification Email',
					html: emailHtml,
				};
				await transporter.sendMail(options);
				break;
			case 'forgotPasswordEmail':
				emailHtml = await render(
					React.createElement(ForgotEmail, {
						language,
						name,
						surname,
						passwordResetLink: url,
					})
				);
				options = {
					from: 'you@example.com',
					to: `${userEmailAdress}`,
					subject:
						language === 'tr'
							? 'Şifre Sıfırlama Talebi'
							: 'Password Reset Request',
					html: emailHtml,
				};
				await transporter.sendMail(options);
				break;
			case 'contactConfirmationEmail':
				emailHtml = await render(
					React.createElement(contactConfirmationEmail, {
						language,
						name,
						surname,
					})
				);
				options = {
					from: 'you@example.com',
					to: `${userEmailAdress}`,
					subject:
						language === 'tr' ? 'İletinizi aldık' : 'We received your querry',
					html: emailHtml,
				};
				await transporter.sendMail(options);
				break;
			case 'PurchaseConfirmationEmail':
				emailHtml = await render(
					React.createElement(PurchaseConfirmationEmail, {
						language,
						name,
						surname,
						program,
						startDate,
						endDate,
						online,
						url,
						location,
					})
				);
				options = {
					from: 'you@example.com',
					to: `${userEmailAdress}`,
					subject:
						language === 'tr' ? 'İletinizi aldık' : 'We received your querry',
					html: emailHtml,
				};
				await transporter.sendMail(options);
				break;
		}
	} catch (error) {
		console.error('Error sending email', error);
		return error;
	}
};
export default emailSender;
