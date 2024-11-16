import mongoose from 'mongoose';

const ContactSchema = mongoose.Schema(
	{
		name: {
			type: String,
			optional: [true, 'Please enter your name'],
		},
		surname: {
			type: String,
			optional: [true, 'Please enter your surname'],
		},
		email: {
			type: String,
			optional: [true, 'Please enter your email'],
		},
		topic: {
			type: String,
			required: [true, 'Please enter your topic'],
		},
		question: {
			type: String,
			required: [true, 'Please enter your question'],
		},

		removed: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const ContactQuestions = mongoose.model('ContactSchema', ContactSchema);

export default ContactQuestions;
