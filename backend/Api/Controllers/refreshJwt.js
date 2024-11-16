import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
dotenv.config();
import { ObjectId } from 'mongodb';
import Users from '../Models/userModel.js';

const refreshJwt = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt)
		return res.status(401).json({ message: 'Refresh token not found' });

	const refreshToken = cookies.jwt;
	const decoded = jwt.decode(refreshToken);
	const userIdFromToken = decoded.userId;
	const foundUser = await Users.findOne({
		_id: new ObjectId(userIdFromToken),
	});
	if (!foundUser) return res.status(403).json({ message: 'tampereed jwt' });
	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err) => {
			if (err) {
				await Sessions.findOneAndDelete(userIdFromToken);
			}
			const accessToken = jwt.sign(
				{
					userId: userIdFromToken,
					email: foundUser.email,
					nationalID: foundUser.nationalID,
				},

				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '1m' } //todo change it
			);
			res.status(200).json({
				message: 'successful refresh',
				returnedValue: accessToken,
			});
		});
	} catch (error) {
		res.status(403).json({
			message: 'refresh failed',
			returnedValue: null,
		});
	}
};
export default refreshJwt;
