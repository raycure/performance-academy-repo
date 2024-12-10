import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name'],
		},
		surname: {
			type: String,
			required: [true, 'Please enter your surname'],
		},
		nationalID: {
			type: Number,
			required: [true, 'Please enter TC id'],
		},
		birthDate: {
			type: Date,
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter a password'],
		},
		removed: {
			type: Boolean,
			default: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		blocked: {
			type: Boolean,
			default: false,
		},
		purchases: [
			{
				productId: {
					type: String,
					required: true,
				},
				purchaseDate: {
					type: Date,
					default: Date.now,
				},
				boughtPrice: {
					type: Number,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

UserSchema.methods.checkIfItsAlreadyBought = function (productId) {
	// Check if product already purchased to prevent duplicates
	const existingPurchase = this.purchases.find(
		(purchase) => purchase.productId.toString() === productId.toString()
	);

	if (existingPurchase) {
		throw new Error('Product already purchased');
	}
};

const Users = mongoose.model('Users', UserSchema);

export default Users;
