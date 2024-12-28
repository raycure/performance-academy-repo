import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
dotenv.config();
import { ObjectId } from 'mongodb';
import Users from '../Models/userModel.js';

const refreshJwt = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt)
		return res
			.status(401)
			.json({ message: res.__('refreshJWTResponse.refreshTokenNotFound') });

	const refreshToken = cookies.jwt;

	const isTheTokenActive = await Sessions.findOne({
		refreshToken: refreshToken,
	});

	if (!isTheTokenActive)
		return res
			.status(401)
			.json({ message: res.__('refreshJWTResponse.TokenInactive') });

	const decoded = jwt.decode(refreshToken);
	const userIdFromToken = decoded.userId;
	const foundUser = await Users.findOne({
		_id: new ObjectId(userIdFromToken),
	});

	if (!foundUser)
		return res
			.status(403)
			.json({ message: res.__('refreshJWTResponse.userNotFound') });
	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err) => {
			if (err) {
				res
					.status(403)
					.json({ message: res.__('refreshJWTResponse.invalidToken') });
				await Sessions.findOneAndDelete(userIdFromToken);
			}
			const accessToken = jwt.sign(
				{
					userId: userIdFromToken,
					email: foundUser.email,
					nationalID: foundUser.nationalID,
				},

				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: '15m' }
			);
		});
		const decodedAccessToken = jwt.decode(refreshToken);
		const userIdFromTheToken = decodedAccessToken.userId;
		res.status(200).json({
			message: res.__('refreshJWTResponse.success'),
			returnedValue: accessToken,
			accessToken: userIdFromTheToken,
		});
	} catch (error) {
		console.log('refresh error', error);

		res.status(403).json({
			message: res.__('refreshJWTResponse.serverError'),
			returnedValue: null,
		});
	}
};
export default refreshJwt;
