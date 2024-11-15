// Ensure Babel is set up to transpile JSX

import React from 'react';
import { renderToString } from 'react-dom/server';
import nodemailer from 'nodemailer';

// This function sends the email with a React component in the body
async function EmailSender(verifyLink, receivers) {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: process.env.ENVIRONMENT === 'development' ? false : true,
			auth: {
				user: 'jarrod.brakus@ethereal.email', // Ensure the email and password are correct
				pass: 'cP8a3WsfD9XqxeQBGG',
			},
		});

		// Render the EmailComponent to a string (HTML)
		// const html = renderToString(
		// 	<EmailComponent>
		// 		<p>
		// 			Please click this link to verify your email:{' '}
		// 			<a href={verifyLink}>{verifyLink}</a>
		// 		</p>
		// 	</EmailComponent>
		// );

		const html = `
		<!DOCTYPE html>
		<html lang="en">
		  <head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Registration Verification</title>
			<style>
			  body {
				background-color: #eeeef3;
				color: #737f8d;
				font-size: 16px;
			  }
  
			  .container {
				max-width: 700px;
				margin: 0 auto;
				padding: 2rem;
				background-color: white;
				border-radius: 8px;
				overflow: hidden;
			  }
  
			  .logo {
				width: 250px;
				margin: 0 auto;
				padding: 1rem;
				display: block;
			  }
  
			  .footer {
				text-align: center;
				color: #a6aeb7;
				margin-top: 1rem;
				font-size: 14px;
			  }
  
			  a {
				color: #1e90ff;
			  }
			</style>
		  </head>
		  <body>
			<div class="container">
			  <img
				src="https://raycure.github.io/public-images/LesmillsLogoBlack.png"
				alt="Lesmills Logo"
				class="logo"
			  />
			  <p>
				Please click this link to verify your email:
				<a href="${verifyLink}">${verifyLink}</a>
			  </p>
			</div>
			<div class="footer">
			  <p>©2024 Performance Academy. All rights reserved.</p>
			</div>
		  </body>
		</html>
	  `;

		// Send the email using nodemailer
		const info = await transporter.sendMail({
			from: '"admin" <13garbomail@gmail.com>', // Ensure this is a valid "from" email address
			to: receivers,
			subject: 'Registration Verification',
			text: `Please click the following link to verify your email: ${verifyLink}`,
			html: html,
		});

		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw error; // Throw the error so the calling function can handle it if needed
	}
}

export default EmailSender;
