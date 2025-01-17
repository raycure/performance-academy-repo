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
		enum: ['pending', 'passed', 'failed', 'null'],
		default: 'null',
	},
	resultUpdatedAt: {
		type: Date,
		default: null,
	},
});

const entranceExamAttemptsSchema = new mongoose.Schema({
	attemptNumber: {
		type: Number,
		required: true,
	},
	attemptDate: {
		type: Date,
		default: Date.now,
	},
	result: {
		type: String,
		enum: ['pending', 'passed', 'failed', 'null'],
		default: 'null',
	},
	resultUpdatedAt: {
		type: Date,
		default: null,
	},
});

const PurchasesSchema = new mongoose.Schema({
	eventId: {
		type: String,
		required: true,
	},
	examAttempts: [ExamAttemptSchema],
	entranceExamAttempts: [entranceExamAttemptsSchema],
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
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		nationalID: {
			type: String,
			required: true,
			unique: true,
		},
		birthDate: {
			type: Date,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		verifiedMail: {
			type: Boolean,
			default: false,
		},
		verifiedContract: {
			type: String,
			enum: ['pending', 'passed', 'failed', 'null'],
			default: 'null',
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

UserSchema.methods.findPurchase = function (eventId) {
	const purchase = this.purchases.find(
		(purchase) => purchase.eventId === eventId
	);
	return purchase;
};

UserSchema.methods.findExamAttempt = function (eventId) {
	const purchase = this.findPurchase(eventId);

	const testAttemptNumber = purchase.examAttempts.length;
	const attempt = purchase.examAttempts.find(
		(attempt) => attempt.attemptNumber === testAttemptNumber
	);

	if (!attempt) {
		throw new Error('Exam attempt not found');
	}
	return attempt;
};

UserSchema.methods.updateExamPayment = function (isPaid, eventId) {
	const attempt = this.findExamAttempt(eventId);
	attempt.isPaid = isPaid;
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

UserSchema.methods.addExamAttempt = function (
	eventId,
	examType,
	isPaid = false
) {
	console.log('adding attempt');

	const purchase = this.findPurchase(eventId);
	if (purchase[examType].length === purchase.maxAttempts) {
		throw new Error('WebhookResponses.ExhaustedAttempts');
	}
	try {
		if (purchase[examType].length === 0) {
			isPaid = true;
			purchase[examType].push(
				examType === 'examAttempts'
					? {
							attemptNumber: purchase[examType].length + 1,
							isPaid,
					  }
					: {
							attemptNumber: purchase[examType].length + 1,
					  }
			);
		} else {
			purchase[examType].push(
				examType === 'examAttempts'
					? {
							attemptNumber: purchase[examType].length + 1,
							isPaid,
					  }
					: {
							attemptNumber: purchase[examType].length + 1,
					  }
			);
		}
	} catch (error) {
		console.log('error in creating an attempt', error);
	}

	console.log('examattemtpts in addexamattempt', purchase[examType]);
	return this.save();
};

const Users = mongoose.model('Users', UserSchema);
export default Users;
