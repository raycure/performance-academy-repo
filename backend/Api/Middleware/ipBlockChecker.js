import BlockedIps from '../Models/blockedUserModel.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const ipBlockChecker = async (req, res, next) => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	try {
		const clientIp = (
			req.headers['x-forwarded-for'] ||
			req.ip ||
			req.connection.remoteAddress ||
			''
		)
			.split(',')[0]
			.trim();

		const isIpBlocked = await BlockedIps.findOne({
			ip: clientIp,
			isActive: true,
		});

		if (isIpBlocked) {
			res.type('html');
			const blockedPagePath = path.join(
				__dirname,
				'../../../public/blocked.html'
			);
			res.set('Content-Type', 'text/html');
			res.header('ip-blocked', 'IP Blocked');
			// all headers have to be exposed at cors config file to be transfared between back and front end
			return res.status(403).sendFile(blockedPagePath);
		}

		next();
	} catch (error) {
		console.error('IP Block Check Error:', error);
		next(error);
	}
};

export default ipBlockChecker;
