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
	},
	{
		timestamps: true,
	}
);

const Users = mongoose.model('Users', UserSchema);

export default Users;
