import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
import { ObjectId } from 'mongodb';
dotenv.config();

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	const refreshToken = cookies.jwt;

	if (!refreshToken) {
		return res.json({ message: 'logged out successfully' });
	}

	let decodedToken;
	try {
		decodedToken = jwt.decode(refreshToken);
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
	} catch (error) {
		if (decodedToken?.userId) {
			await Sessions.deleteOne({
				identifiers: {
					$elemMatch: {
						userId: new ObjectId(decodedToken.userId),
					},
				},
			});
		}

		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'Lax',
			path: '/',
			secure: process.env.ENVIRONMENT === 'development' ? false : true,
		});

		return res.status(403).json({
			message: res.__('sessionExpired'),
		});
	}

	try {
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

		res.json({ message: res.__('logoutResponses.success'), notify: true });
	} catch (error) {
		res.status(500).json({ message: res.__('serverError') });
	}
};

export default handleLogout;
