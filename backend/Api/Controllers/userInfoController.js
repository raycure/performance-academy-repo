import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export const userInfoFetchController = async (req, res) => {
	if (req.isAuthenticated) {
		const decoded = jwt.decode(req.user);
		const userIDfromRefresh = decoded.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userIDfromRefresh),
		});

		res.status(200).json({
			message: 'userinfo fetch successful',
			foundUser,
			accessToken: req.user,
		});
	} else {
		res.status(401).json({ message: 'not authed' });
	}
};

export const userInfoPutController = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res.status(401).json({ message: 'Unauthorized access' });
		}

		const updateData = req.body.updateData;
		const decoded = jwt.decode(req.user);
		const userIDfromRefresh = decoded.userId;

		const foundUser = await Users.findOne({
			_id: new ObjectId(userIDfromRefresh),
		});

		if (!foundUser) {
			return res.status(404).json({ message: 'User not found' });
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
				{ _id: new ObjectId(userIDfromRefresh) },
				{ $set: fieldsToUpdate }
			);
			return res.status(200).json({
				message: 'User updated successfully',
				updatedFields: fieldsToUpdate,
			});
		}

		return res.status(200).json({
			message: 'No changes detected',
			updatedFields: {},
		});
	} catch (error) {
		console.error('Error updating user:', error);
		return res.status(500).json({
			message: 'Internal server error',
			error: error.message,
		});
	}
};
