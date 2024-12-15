import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { PurchaseModel } from '../Models/purchaseModel.js';
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
			return res.status(400).send(`Webhook Error: ${err.message}`);
		}
		switch (event.type) {
			case 'checkout.session.completed':
				const session = event.data.object;
				const productId = session.metadata.programId;
				const boughtPrice = session.metadata.boughtPrice;
				const foundItem = session.metadata.foundItem;
				const foundItemObject = JSON.parse(foundItem);
				let userId = session.metadata.userId;
				userId = new ObjectId(userId); // the userid in metadata is a string for mongo to find it more efficiently we need to convert into a objectId object

				await PurchaseModel.updateOne(
					{ userId },
					{ $set: { status: 'completed' } }
				);

				const purchaseData = {
					productId,
					boughtPrice,
				};

				const foundUser = await Users.findById(userId);

				await Users.findByIdAndUpdate(userId, {
					$push: { purchases: purchaseData },
				});

				try {
					const myProgramsUrl = 'http://localhost:5173/programlar%C4%B1m';
					const contactUrl = 'http://localhost:5173/ileti%C5%9Fim';
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
				break;

			case 'checkout.session.expired':
				const expiredSession = event.data.object;
				await PurchaseModel.updateOne(
					{ stripeSessionId: expiredSession.id },
					{
						$set: {
							status: 'expired',
						},
					}
				);
				break;

			case 'checkout.session.rejected':
				const rejectedSession = event.data.object;
				await PurchaseModel.updateOne(
					{ stripeSessionId: rejectedSession.id },
					{
						$set: {
							status: 'rejected',
						},
					}
				);
				break;

			default:
				// Optionally log unknown event types
				console.log(`Unhandled event type: ${event.type}`);
				break;
		}
		res.sendStatus(200);
	} catch (error) {
		console.log('webhook error', error);
	}
};

export default webhook;
