import Users from '../Models/userModel.js';
import { ObjectId } from 'mongodb';
import pkg from 'bcryptjs';
import validateInput from '../../Utils/validateInput.js';
import {
	passwordSchema,
	userinfoChangeSchemas,
} from '../../Utils/schemas/userSchema.js';
import Sessions from '../Models/sessionModel.js';
import handleLogout from './logoutController.js';
const { hash, compare } = pkg;
export const userInfoFetchController = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			console.log('no is authenticated ');
			return res.status(401).json({ message: res.__('unauthorized') });
		}
		const userId = req.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userId),
		});
		return res.status(200).json({
			message: res.__('userInfoResponses.userInfoFetch'),
			foundUser,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('error', error);
	}
};
export const deleteAccount = async (req, res) => {
	if (!req.isAuthenticated) {
		return res.status(401).json({ message: res.__('unauthorized') });
	}
	await Users.deleteOne({
		nationalId: req.body.nationalId,
		email: req.body.email,
	});
	await Sessions.deleteOne({
		nationalId: req.body.nationalId,
		email: req.body.email,
	});
	req.isFromDeleteAccount = true;
	await handleLogout(req, res);
};
export const userInfoPutController = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res
				.status(401)
				.json({ message: res.__('userInfoResponses.unauthorized') });
		}
		const { updateData } = req.body;
		const language = req.headers['language'];
		const newPassword = updateData?.newPassword;
		const userId = req.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userId),
		});
		const isMatch = await pkg.compare(newPassword, foundUser.password);
		if (isMatch) {
			return res
				.status(422)
				.json({ message: res.__('userInfoResponses.unchangedPassword') });
		}
		try {
			validateInput(updateData, userinfoChangeSchemas);
			if (newPassword) {
				validateInput({ password: newPassword }, passwordSchema);
			}
		} catch (error) {
			const trasnlatedMessage = res.__(`${error.message.errorMessage}`);
			const trasnlatedErrorField = res.__(`${error.message.errorField}`);
			return res
				.status(422)
				.json({ message: trasnlatedErrorField + ' ' + trasnlatedMessage });
		}
		if (updateData?.newPassword) {
			const hashedPassword = await hash(newPassword, 10);
			await Users.findByIdAndUpdate(foundUser._id, {
				password: hashedPassword,
			});
		}
		const plainUser = foundUser.toObject();
		// mongo's object are different than plain objects
		const fieldsToUpdate = {};
		Object.keys(updateData).forEach((key) => {
			// Handle different types of comparisons
			const currentValue = plainUser[key];
			const newValue = updateData[key];
			// Convert values to the same type for comparison
			const hasChanged = (() => {
				// Handle null/undefined cases
				if (currentValue === null || currentValue === undefined) {
					return newValue !== null && newValue !== undefined;
				}
				// Handle dates
				if (currentValue instanceof Date || newValue instanceof Date) {
					const currentDate = new Date(currentValue).getTime();
					const newDate = new Date(newValue).getTime();
					return currentDate !== newDate;
				}
				// Handle objects
				if (typeof currentValue === 'object' && typeof newValue === 'object') {
					return JSON.stringify(currentValue) !== JSON.stringify(newValue);
				}
				// Handle numbers stored as strings
				if (typeof currentValue === 'number' || typeof newValue === 'number') {
					return Number(currentValue) !== Number(newValue);
				}
				// Default string comparison
				return String(currentValue) !== String(newValue);
			})();
			if (hasChanged) {
				fieldsToUpdate[key] = newValue;
			}
		});
		// Only update if there are changes
		if (Object.keys(fieldsToUpdate).length > 0) {
			await Users.updateOne(
				{ _id: new ObjectId(userId) },
				{ $set: fieldsToUpdate }
			);
			if (Object.keys(fieldsToUpdate).includes('email')) {
				await Users.updateOne(
					{ _id: new ObjectId(userId) },
					{ $set: { verifiedMail: false } }
				);
			}
			return res.status(200).json({
				message:
					res.__('userInfoResponses.userUpdate') +
					Object.keys(fieldsToUpdate)
						.map((field) => res.__(`userInfoResponses.${field}`))
						.join(', '),
				notify: true,
				updatedFields: fieldsToUpdate,
			});
		}
		return res.status(200).json({
			message: res.__('userInfoResponses.noChanges'),
			updatedFields: {},
			notify: true,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			message: res.__('serverError'),
			error: error.message,
		});
	}
};
