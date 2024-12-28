import mongoose from 'mongoose';

const EventPurchaseSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			index: true,
		},
		eventId: {
			type: String,
			required: true,
			ref: 'Product',
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
		purchasedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

const ExamFeeSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
			ref: 'Users',
			index: true,
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
		purchasedAt: {
			type: Date,
		},
		eventId: {
			type: String,
			required: true,
			ref: 'Users',
		},
	},
	{
		timestamps: true,
	}
);

export const EventPurchaseModel = mongoose.model(
	'EventPurchaseSchema',
	EventPurchaseSchema
);

export const ExamFeeModel = mongoose.model('ExamFeeSchema', ExamFeeSchema);
