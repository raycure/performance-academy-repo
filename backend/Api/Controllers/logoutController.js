import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
import { ObjectId } from 'mongodb';
dotenv.config();

const handleLogout = async (req, res, sentFromAuthHandle = false) => {
	const cookies = req.cookies;
	const refreshToken = cookies?.jwt;

	if (!refreshToken && !sentFromAuthHandle) {
		return res.status(200).json({
			message: res.__('logoutResponses.success'),
			notify: true,
		});
	}

	try {
		let decodedToken = jwt.decode(refreshToken);
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		await Sessions.deleteOne({
			identifiers: {
				$elemMatch: {
					userId: new ObjectId(decodedToken.userId),
				},
			},
		});
	} catch (error) {}

	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'Lax',
		path: '/',
		secure: process.env.ENVIRONMENT === 'development' ? false : true,
	});

	if (req.isFromDeleteAccount) {
		return res.json({
			message: res.__('userInfoResponses.accountDeleted'),
			notify: true,
		});
	} else if (sentFromAuthHandle) {
		return null;
	} else {
		return res.json({
			message: res.__('logoutResponses.success'),
			notify: true,
		});
	}
};

export default handleLogout;
