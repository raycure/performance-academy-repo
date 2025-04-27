import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const verifyJWT = async (req, res) => {
	const accessToken = req.accessToken;
	try {
		console.log('accessToken in verifyJWT:', accessToken);
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		res.status(200).json({
			message: 'successful verify jwt',
		});
	} catch (error) {
		return res.status(403).json({ message: 'Token verification failed' });
	}
};

export default verifyJWT;
