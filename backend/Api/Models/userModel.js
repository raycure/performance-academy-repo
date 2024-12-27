import mongoose from 'mongoose';

const ExamAttemptSchema = new mongoose.Schema({
	attemptNumber: {
		type: Number,
		required: true,
	},
	isPaid: {
		type: Boolean,
		default: false,
	},
	attemptDate: {
		type: Date,
		default: Date.now,
	},
	result: {
		type: String,
		enum: ['pending', 'passed', 'failed'],
		default: 'pending',
	},
});

const PurchasesSchema = new mongoose.Schema({
	eventId: {
		type: String,
		required: true,
	},
	examAttempts: [ExamAttemptSchema],
	purchaseDate: {
		type: Date,
		default: Date.now,
	},
	boughtPrice: {
		type: Number,
	},
	maxAttempts: {
		type: Number,
		default: 3,
	},
});

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
			// unique: true,
		},
		birthDate: {
			type: Date,
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			// unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter a password'],
		},
		verifiedMail: {
			type: Boolean,
			default: false,
		},
		verifiedContract: {
			type: String,
			enum: ['pending', 'passed', 'failed'],
			default: 'failed',
		},
		blocked: {
			type: Boolean,
			default: false,
		},
		purchases: [PurchasesSchema],
	},
	{
		timestamps: true,
	}
);

// todo add a userfinder function

UserSchema.methods.findPurchase = function (eventId) {
	const purchase = this.purchases.find(
		(purchase) => purchase.eventId === eventId
	);

	// if (!purchase) {
	// 	throw new Error('Purchase not found');
	// }
	return purchase;
};

UserSchema.methods.findExamAttempt = function (eventId) {
	console.log('item id type in find attmept', typeof eventId);

	const purchase = this.findPurchase(eventId);

	const testAttemptNumber = purchase.examAttempts.length;
	console.log(testAttemptNumber, 'testAttemptNumber');
	const attempt = purchase.examAttempts.find(
		(attempt) => attempt.attemptNumber === testAttemptNumber
	);

	console.log('found attempt in findExamAttempt', attempt);

	if (!attempt) {
		throw new Error('Exam attempt not found');
	}
	return attempt;
};

UserSchema.methods.updateExamPayment = function (isPaid, eventId) {
	const attempt = this.findExamAttempt(eventId);
	console.log('attempt in updateExamPayment', attempt);
	attempt.isPaid = isPaid;

	if (!attempt) {
		console.log('couldnt find the attempt');
	}
	return this.save();
};

// Method to update exam attempt result
UserSchema.methods.updateExamAttemptResult = function (
	productId,
	attemptNumber,
	result
) {
	// Using method chaining/internal method calls
	const attempt = this.findExamAttempt(productId, attemptNumber);

	attempt.result = result;

	// Check if max failed attempts reached
	const purchase = this.findPurchase(productId);
	const failedAttempts = purchase.examAttempts.filter(
		(attempt) => attempt.result === 'failed'
	).length;

	if (failedAttempts >= purchase.maxAttempts) {
		// Remove the purchase if max failed attempts reached
		this.purchases = this.purchases.filter(
			(p) => p.productId.toString() !== productId.toString()
		);
	}

	return this.save();
};

// Method to add a new exam attempt
UserSchema.methods.addExamAttempt = function (eventId, isPaid = false) {
	const purchase = this.findPurchase(eventId);

	if (purchase.examAttempts.length === purchase.maxAttempts) {
		throw new Error('Maximum exam attempts reached');
	}
	try {
		if (purchase.examAttempts.length === 0) {
			isPaid = true;
		}
		purchase.examAttempts.push({
			attemptNumber: purchase.examAttempts.length + 1,
			isPaid,
			result: 'pending',
		});
	} catch (error) {
		console.log('error in creating an attempt', error);
	}

	return this.save();
};

const Users = mongoose.model('Users', UserSchema);
export default Users;
