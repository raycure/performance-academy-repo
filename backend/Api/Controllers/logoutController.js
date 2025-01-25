import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
import { ObjectId } from 'mongodb';
dotenv.config();

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	const refreshToken = cookies.jwt;
	if (!refreshToken) {
		res.json({ message: res.__('logoutResponses.success'), notify: true });
	}

	try {
		let decodedToken;
		decodedToken = jwt.decode(refreshToken);
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		await Sessions.deleteOne({
			identifiers: {
				$elemMatch: {
					userId: new ObjectId(decodedToken.userId),
				},
			},
		});

		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'Lax',
			path: '/',
			secure: process.env.ENVIRONMENT === 'development' ? false : true,
		});

		if (req.isFromDeleteAccount) {
			res.json({
				message: res.__('userInfoResponses.accountDeleted'),
				notify: true,
			});
		} else if (req.sentFromAuthHandle) {
			return res.end();
		} else {
			res.json({ message: res.__('logoutResponses.success'), notify: true });
		}
	} catch (error) {
		res.status(500).json({ message: res.__('serverError') });
	}
};

export default handleLogout;
