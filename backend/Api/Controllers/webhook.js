import Stripe from 'stripe';
import { EventPurchaseModel, ExamFeeModel } from '../Models/purchaseModel.js';
import { ObjectId } from 'mongodb';
import Users from '../Models/userModel.js';
import emailSender from './emailSender.js';

const webhook = async (req, res) => {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
		const sig = req.headers['stripe-signature'];
		const language = req.headers['language'];

		let event;

		try {
			event = stripe.webhooks.constructEvent(
				req.body,
				sig,
				process.env.STRIPE_WEBHOOK_SECRET
			);
		} catch (err) {
			console.log('erorr in webhook', err);
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}
		switch (event.type) {
			case 'checkout.session.completed':
				await handleCheckoutCompleted(event, language);
				break;

			case 'checkout.session.expired':
			case 'checkout.session.rejected':
				await handleCheckoutInvalidSession(event);
				break;

			default:
				// console.log(`Unhandled event type: ${event.type}`);
				break;
		}
	} catch (error) {
		console.log('webhook error', error);
	}
};

const handleCheckoutCompleted = async (event, language) => {
	const session = event.data.object;
	const purchaseType = session.metadata.purchaseType;
	switch (purchaseType) {
		case 'productPurchase':
			handleProductPurchase(session, language);
			break;
		case 'payExamFee':
			handlepayExamFee(session, language);
			break;
		default:
			console.log('unhanled Purchase type');
			break;
	}
};

const handleProductPurchase = async (session, language) => {
	const eventId = session.metadata.eventId;
	const boughtPrice = session.metadata.boughtPrice;
	const foundItem = session.metadata.foundItem;
	const foundItemObject = JSON.parse(foundItem);
	let userId = session.metadata.userId;
	userId = new ObjectId(userId); // the userid in metadata is a string for mongo to find it more efficiently we need to convert into a objectId object

	await EventPurchaseModel.updateOne(
		{ stripeSessionId: session.id },
		{ $set: { status: 'completed' } }
	);

	const purchaseData = {
		eventId,
		boughtPrice,
	};

	await Users.findByIdAndUpdate(userId, {
		$push: { purchases: purchaseData },
	});

	const foundUser = await Users.findById(userId);
	await foundUser.addExamAttempt(eventId);

	try {
		const myProgramsUrl =
			process.env.ENVIRONMENT === 'development'
				? process.env.DEV_MYPROGRAMS_LINK
				: process.env.PROD_MYPROGRAMS_LINK;
		const contactUrl =
			process.env.ENVIRONMENT === 'development'
				? process.env.DEV_CONTACT_LINK
				: process.env.PROD_CONTACT_LINK;
		const emailResponse = await emailSender(
			'PurchaseConfirmationEmail',
			language,
			foundUser.email,
			foundUser.name,
			foundUser.surname,
			{ myProgramsUrl, contactUrl },
			{
				program: foundItemObject.program,
				startDate: foundItemObject.start,
				endDate: foundItemObject.end,
				online: foundItemObject.online,
				location: foundItemObject.location,
			}
		);
	} catch (error) {
		console.log('email sending error', error);
	}
};
const handlepayExamFee = async (session) => {
	const metadata = session.metadata;
	const { userId, itemId } = metadata;
	const foundUser = await Users.findById(userId);
	await foundUser.updateExamPayment(true, itemId);

	await ExamFeeModel.updateOne(
		{ stripeSessionId: session.id },
		{ $set: { status: 'completed' } }
	);
};
const handleCheckoutInvalidSession = async (event) => {
	const session = event.data.object;
	const status =
		event.type === 'checkout.session.expired' ? 'expired' : 'rejected';
	const purchaseType = session.metadata.purchaseType;

	try {
		switch (purchaseType) {
			case 'productPurchase':
				await EventPurchaseModel.updateOne(
					{ stripeSessionId: session.id },
					{ $set: { status } }
				);
				break;

			case 'payExamFee':
				await ExamFeeModel.updateOne(
					{ stripeSessionId: session.id },
					{ $set: { status } }
				);
				break;

			default:
				console.log(
					`Unhandled purchase type for invalid session: ${purchaseType}`
				);
				break;
		}
	} catch (error) {
		console.error('Error handling invalid checkout session:', error);
	}
};

export default webhook;
