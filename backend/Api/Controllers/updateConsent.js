import Users from '../Models/userModel.js';
import { ObjectId } from 'mongodb';
async function updateConsent(req, res) {
	try {
		if (req.isAuthenticated) {
			console.log('HERE');

			const userId = req.userId;
			console.log('userId', userId);
			const test = await Users.updateOne(
				{ _id: new ObjectId(userId) },
				{ cookieConsent: true }
			);
			console.log('test ', test);
		}
		res.status(200).json({ message: 'successfully consented cookies' });
	} catch (error) {
		console.log('error', error);
	}
}

export default updateConsent;
