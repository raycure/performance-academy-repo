import jwt from 'jsonwebtoken';
import ContactQuestions from '../Models/contactFormModel.js';
import Users from '../Models/userModel.js';
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import authMiddleware from '../Middleware/handleAuth.js';
import emailSender from './emailSender.js';

dotenv.config();

const publicContactFormController = async (req, res) => {
	console.log('req.body in contact', req.body);
	const language = req.headers['language'];
	try {
		const { topic, question, email, name, surname } = req.body;
		if (!topic || !question || !email || !name || !surname) {
			return res.status(400).json({
				message: 'Missing required fields',
				requiredFields: ['topic', 'question', 'email', 'name', 'surname'],
			});
		}
		//todo add proper validation with joi
		const questionData = { email, topic, name, surname, question };

		console.log('questionData in non authed user', questionData);

		const newQuestion = await ContactQuestions.create(questionData);
		await emailSender(
			'contactConfirmationEmail',
			language,
			email,
			name,
			surname
		);
		res.status(201).json({
			message: 'Contact form submitted successfully',
			questionId: newQuestion._id,
		});
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'contact form submission failed' });
	}
};
const protectedContactFormController = async (req, res) => {
	console.log('req.body in contact', req.body);
	const language = req.headers['language'];
	try {
		if (req.isAuthenticated) {
			const { topic, question } = req.body;
			if (!topic || !question) {
				return res.status(400).json({
					message: 'Missing required fields',
					requiredFields: ['topic', 'question', 'email', 'name', 'surname'],
				});
			}
			//todo add proper validation with joi

			const decoded = jwt.decode(req.user);
			const userIDfromRefresh = decoded.userId;
			const foundUser = await Users.findOne({
				_id: new ObjectId(userIDfromRefresh),
			});

			const { name, surname, email } = foundUser;

			const questionData = { email, topic, name, surname, question };

			console.log('questionData in non authed user', questionData);

			const newQuestion = await ContactQuestions.create(questionData);

			await emailSender(
				'contactConfirmationEmail',
				language,
				email,
				name,
				surname
			);
			res.status(201).json({
				message: 'Contact form submitted successfully',
				accessToken: req.user,
				questionId: newQuestion._id,
			});
		}
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: 'contact form submission failed' });
	}
};

export { publicContactFormController, protectedContactFormController };
