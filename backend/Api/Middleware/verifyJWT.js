import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const verifyJWT = async (req, res) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		console.log('header is missing');
		return res.status(401).json({ message: 'Token is missing or invalid' });
	}
	const token = authHeader.split(' ')[1];

	try {
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err) => {
			if (err) {
				return res.status(403).json({ message: 'Token verification failed' });
			}
			res.status(200).json({
				message: 'successful verify jwt',
				returnedValue: token,
			});
		});
	} catch (error) {
		console.error('Unexpected error:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export default verifyJWT;
