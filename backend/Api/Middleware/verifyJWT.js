import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader)
		return res.status(401).json({ message: 'Token is missing or invalid' });
	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err)
			return res.status(403).json({ message: 'Token verification failed' });
		req.user = decoded.username;
		next();
	});
};

export default verifyJWT;
