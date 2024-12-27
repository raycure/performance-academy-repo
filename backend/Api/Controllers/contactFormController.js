import ContactQuestions from '../Models/contactFormModel.js';
import Users from '../Models/userModel.js';
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import authMiddleware from '../Middleware/handleAuth.js';
import emailSender from './emailSender.js';
import validateInput from '../../Utils/validateInput.js';
import {
	publicContactSchema,
	privateContactSchema,
} from '../../Utils/schemas/userSchema.js';

dotenv.config();

const publicContactFormController = async (req, res) => {
	const language = req.headers['language'];
	try {
		const { topic, question, email, name, surname } = req.body;
		const contactData = { topic, question, email, name, surname };
		try {
			validateInput(contactData, publicContactSchema);
		} catch (error) {
			const trasnlatedMessage = res.__(`${error.message.errorMessage}`);
			const trasnlatedErrorField = res.__(`${error.message.errorField}`);
			return res
				.status(422)
				.json({ message: trasnlatedErrorField + ' ' + trasnlatedMessage });
		}
		const questionData = { email, topic, name, surname, question };

		const newQuestion = await ContactQuestions.create(questionData);
		await emailSender(
			'contactConfirmationEmail',
			language,
			email,
			name,
			surname
		);
		return res.status(201).json({
			message: res.__('contactResponses.success'),
			questionId: newQuestion._id,
			notify: true,
			duration: 5000,
		});
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: res.__('contactResponses.error') });
	}
};
const protectedContactFormController = async (req, res) => {
	const language = req.headers['language'];
	try {
		if (!req.isAuthenticated) {
			throw new Error('auth required');
		}

		const userId = req.userId;
		const { topic, question } = req.body;
		const contactData = { topic, question };
		try {
			validateInput(contactData, privateContactSchema);
		} catch (error) {
			const trasnlatedMessage = res.__(`${error.message.errorMessage}`);
			const trasnlatedErrorField = res.__(`${error.message.errorField}`);
			return res
				.status(422)
				.json({ message: trasnlatedErrorField + ' ' + trasnlatedMessage });
		}

		const foundUser = await Users.findOne({
			_id: new ObjectId(userId),
		});

		const { name, surname, email } = foundUser;

		const questionData = { email, topic, name, surname, question };

		const newQuestion = await ContactQuestions.create(questionData);

		await emailSender(
			'contactConfirmationEmail',
			language,
			email,
			name,
			surname
		);
		res.status(201).json({
			message: res.__('contactResponses.success'),
			accessToken: req.user,
			questionId: newQuestion._id,
			notify: true,
			duration: 5000,
		});
	} catch (error) {
		console.log('error', error);
		res.status(500).json({ message: res.__('contactResponses.error') });
	}
};

export { publicContactFormController, protectedContactFormController };
