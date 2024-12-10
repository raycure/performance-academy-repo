import Users from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const getPaidProducts = async (req, res) => {
	if (req.isAuthenticated) {
		const decoded = jwt.decode(req.user);
		const userIDfromRefresh = decoded.userId;
		const foundUser = await Users.findOne({
			_id: new ObjectId(userIDfromRefresh),
		});
		const purchases = foundUser.purchases;

		res.status(200).json({
			purchases,
		});
	} else {
		res.status(401).json({ message: 'not authed' });
	}
};

export default getPaidProducts;
