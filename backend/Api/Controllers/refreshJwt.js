import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
dotenv.config();
import { ObjectId } from 'mongodb';
import Users from '../Models/userModel.js';

const refreshJwt = async (req, res) => {
	const cookies = req.cookies;
	const refreshToken = cookies.jwt;
	const decoded = jwt.decode(refreshToken);
	const userIdFromToken = decoded.userId;
	const foundUser = await Users.findOne({
		_id: new ObjectId(userIdFromToken),
	});
	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const newAccessToken = jwt.sign(
			{
				userId: userIdFromToken,
				email: foundUser.email,
				nationalID: foundUser.nationalID,
			},

			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);
		res.status(200).json({
			newAccessToken,
		});
	} catch (error) {
		await Sessions.findOneAndDelete(userIdFromToken);
		res.status(403).json({
			message: 'authResponses.invalidToken',
		});
	}
};
export default refreshJwt;
