import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader)
		return res.status(401).json({ message: 'Token is missing or invalid' });

	const token = authHeader.split(' ')[1];

	try {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				throw err;
			}
			res.status(200).json({
				message: 'successful verify jwt',
				returnedValue: token,
			});
		});
	} catch (error) {
		return res.status(403).json({ message: 'Token verification failed' });
	}
};

export default verifyJWT;
