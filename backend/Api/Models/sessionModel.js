import mongoose from 'mongoose';

const SessionSchema = mongoose.Schema(
	{
		token: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
		ip: {
			type: String,
			required: true,
			trim: true,
		},
		// expiresAt: {
		//   type: Date,
		//   required: true,
		// },
	},
	{
		timestamps: true,
	}
);

const Sessions = mongoose.model('Sessions', SessionSchema);

export default Sessions;
