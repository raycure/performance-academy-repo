import mongoose from 'mongoose';

const SessionSchema = mongoose.Schema(
	{
		refreshToken: {
			type: String,
			required: true,
		},
		ip: {
			type: String,
			required: true,
			trim: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

const Sessions = mongoose.model('Sessions', SessionSchema);

export default Sessions;
