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
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err) => {
			if (err) {
				await Sessions.findOneAndDelete(userIdFromToken);
				res.status(403).json({ message: 'expiredSession' });
			}
			const accessToken = jwt.sign(
				{
					userId: userIdFromToken,
					email: foundUser.email,
					nationalID: foundUser.nationalID,
				},

				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '3s' }
			);

			const decodedAccessToken = jwt.decode(refreshToken);
			const userIdFromTheToken = decodedAccessToken.userId;
			res.status(200).json({
				returnedValue: accessToken,
				accessToken: userIdFromTheToken,
			});
		});
	} catch (error) {
		return res.status(403).json({
			returnedValue: null,
		});
	}
};
export default refreshJwt;
