import mongoose from 'mongoose';

const PurchaseSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			ref: 'Users',
			index: true,
		},
		programId: {
			type: String,
			required: true,
		},
		boughtPrice: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			enum: ['pending', 'completed', 'failed', 'expired'],
			default: 'pending',
		},
		stripeSessionId: {
			type: String,
		},
		stripePaymentIntentId: {
			type: String,
		},
		purchasedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

export const PurchaseModel = mongoose.model('Purchase', PurchaseSchema);
