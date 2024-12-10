import mongoose from 'mongoose';

const BlockedIpsSchema = mongoose.Schema(
	{
		ip: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		reason: {
			type: String,
			default: 'Unspecified',
			trim: true,
		},
		user: [
			{
				// spesifices which account it is
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users', // References to the User model
				required: true,
			},
		],
		isActive: {
			type: Boolean,
			default: true,
		},
		blockedAt: {
			type: Date,
			default: Date.no,
		},
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

const BlockedIps = mongoose.model('BlockedIps', BlockedIpsSchema);

export default BlockedIps;
