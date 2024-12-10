import mongoose from 'mongoose';
import BlockedIps from '../Models/blockedUserModel.js';
import Sessions from '../Models/sessionModel.js';
import Users from '../Models/userModel.js';

const blockIp = async (req, res) => {
	try {
		const ipBlockReq = req.body.ip;
		const isBlockAlreadyExist = await BlockedIps.findOne({ ip: ipBlockReq });
		if (isBlockAlreadyExist) {
			return res.status(400).json({
				message: 'IP is already blocked',
				existingBlock: isBlockAlreadyExist,
			});
		}

		const foundSessions = await Sessions.find({ ip: ipBlockReq });

		let foundAccounts;

		if (foundSessions.length > 1) {
			const suspendedAccountIds = foundSessions.map((item) => item.userId);

			foundAccounts = await Promise.all(
				suspendedAccountIds.map((userId) => Users.findOne({ _id: userId }))
			);
			await Users.updateMany(
				{ _id: { $in: suspendedAccountIds } },
				{ $set: { blocked: true } }
			);

			await BlockedIps.create({
				ip: ipBlockReq,
				user: suspendedAccountIds,
			});
		} else if (foundSessions.length === 1) {
			foundAccounts = await Users.findOne({ _id: foundSessions[0].userId });
			await Users.updateOne(
				{ _id: foundSessions[0].userId },
				{ $set: { blocked: true } }
			);
			await BlockedIps.create({
				ip: ipBlockReq,
				user: foundSessions[0].userId,
			});
		} else {
			// No sessions found for this IP
			return res.status(404).json({
				message: 'No sessions found for this IP',
			});
		}

		return res.status(200).json({
			message: 'IP successfully blocked',
			affectedSessions: foundSessions.length,
			affectedAccounts: foundAccounts,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'failed op' });
	}
};

export default blockIp;
