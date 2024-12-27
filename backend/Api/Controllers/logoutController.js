import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
import { ObjectId } from 'mongodb';
dotenv.config();

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;

	let decodedToken;
	try {
		decodedToken = jwt.decode(refreshToken);
	} catch (decodeError) {
		return res.status(403).json({
			message: res.__('sessionExpired'),
		});
	}
	const userIdFromToken = decodedToken.userId;
	await Sessions.deleteOne({
		identifiers: {
			$elemMatch: {
				userId: new ObjectId(userIdFromToken),
			},
		},
	});

	res.clearCookie('jwt', {
		httpOnly: true,
		// maxAge: 1000 * 60 * 60 * 24,
		sameSite: 'Lax',
		path: '/',
		secure: process.env.ENVIRONMENT === 'development' ? false : true,
	});

	res.json({ message: 'logged out successfully' });
};
export default handleLogout;
