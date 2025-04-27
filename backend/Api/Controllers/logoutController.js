import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
import { ObjectId } from 'mongodb';
dotenv.config();

const handleLogout = async (req, res, sentFromAuthHandle = false) => {
	try {
		const cookies = req.cookies;
		const refreshToken = cookies?.jwt;

		if (!refreshToken && !sentFromAuthHandle) {
			return res.status(200).json({
				message: res.__('logoutResponses.success'),
				notify: true,
			});
		}

		try {
			const decodedToken = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
			await Sessions.deleteOne({
				identifiers: {
					$elemMatch: {
						userId: new ObjectId(decodedToken.userId),
					},
				},
			});
		} catch (error) {
			// Continue with logout even if session deletion fails
		}

		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'Lax',
			path: '/',
			secure: process.env.ENVIRONMENT === 'development' ? false : true,
		});

		if (req.isFromDeleteAccount) {
			return res.status(200).json({
				message: res.__('userInfoResponses.accountDeleted'),
				notify: true,
			});
		} else if (sentFromAuthHandle === true) {
			return null;
		} else {
			return res.status(200).json({
				message: res.__('logoutResponses.success'),
				notify: true,
			});
		}
	} catch (error) {
		console.log('error in logout:', error);
		return res.status(500).json({
			message: 'Error during logout process',
		});
	}
};
export default handleLogout;
