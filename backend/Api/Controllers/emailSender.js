import nodemailer from 'nodemailer';

async function EmailSender(verifyLink, receivers) {
	try {
		const transporter = nodemailer.createTransport({
			host: 'smtp.ethereal.email',
			port: 587,
			secure: process.env.ENVIROMENT === 'development' ? false : true,
			auth: {
				user: 'kyler.miller5@ethereal.email',
				pass: 'deZQ6ZukDenNtp4kxy',
			},
		});

		const info = await transporter.sendMail({
			from: '"admin" <13garbomail@gmail.com>', // sender address
			to: receivers, // list of receivers
			subject: 'Registration Verification', // Subject line
			text: `Please click the following link to verify your email: ${verifyLink}`, // plain text body
			html: `Please click this link to verify your email: <a href="${verifyLink}">${verifyLink}</a>`, // HTML body
		});

		console.log('Message sent: %s', info.messageId);
	} catch (error) {
		console.error('Error sending verification email:', error);
		throw error; // re-throw the error to handle it in the caller function
	}
}
export default EmailSender;
