import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
// import { Email } from '../../dist/Controllers/testEmail.js'; test mail
import VerificationEmail from '../../dist/Controllers/vertestEmail.js';
import { createElement } from 'react';
import React from 'react';

const emailSender = async () => {
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

		// Await the render to get the HTML string
		const emailHtml = await render(
			createElement(VerificationEmail, { url: 'https://example.com' })
		);

		const options = {
			from: 'you@example.com',
			to: 'user@gmail.com',
			subject: 'hello world',
			html: emailHtml,
		};

		await transporter.sendMail(options);
	} catch (error) {
		console.error('Error sending email', error);
	}
};
export default emailSender;

// mae1@ethereal.email
// 		Ay1VH761Dr6AKQgSf5
// 		smtp.ethereal.email
// 		587
