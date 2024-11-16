import jwt from 'jsonwebtoken';
import ContactQuestions from '../Models/contactFormModel.js';
import Users from '../Models/userModel.js';
import * as dotenv from 'dotenv';
import verifyJWT from '../Middleware/verifyJWT.js';
import refreshTokenController from './refreshJwt.js';
import { User } from 'lucide-react';
import { ObjectId } from 'mongodb';

dotenv.config();

const contactFormController = async (req, res) => {
	try {
		const { topic, question } = req.body;

		if (req.isAuthenticated) {
			const decoded = jwt.decode(req.user);
			const userIDfromRefresh = decoded.userId;
			const foundUser = await Users.findOne({
				_id: new ObjectId(userIDfromRefresh),
			});
			const { name, surename, email } = foundUser;
			const newQuestion = await ContactQuestions.create({
				email,
				topic,
				name,
				surename,
				question,
			});
			res.status(200).json({ message: 'fuck youuu', newAccessToken: req.user });
		} else {
			const { email, name, surename } = req.body;
			const newQuestion = await ContactQuestions.create({
				email,
				topic,
				name,
				surename,
				question,
			});
			res.status(200).json({ message: 'fuck youuu' });
			// todo change it
		}
	} catch (error) {
		res.status(500).json({ message: 'contact form submission failed' });
	}
};

export default contactFormController;

// todo add shcema and joi
