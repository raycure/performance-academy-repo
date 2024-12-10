import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import Sessions from '../Models/sessionModel.js';
import { ObjectId } from 'mongodb';
dotenv.config();

const handleLogout = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;
	const decoded = jwt.decode(refreshToken);
	const userIdFromToken = decoded.userId;
	const foundUser = await Sessions.findOne({
		userId: new ObjectId(userIdFromToken).toHexString(),
	});
	res.clearCookie('jwt', {
		httpOnly: true,
		// maxAge: 1000 * 60 * 60 * 24,
		sameSite: 'Lax',
		path: '/',
		secure: process.env.ENVIRONMENT === 'development' ? false : true,
	});
	const isDeleted = await Sessions.deleteOne(foundUser);
	res.json({ message: 'deleted', value: isDeleted });
};
export default handleLogout;
