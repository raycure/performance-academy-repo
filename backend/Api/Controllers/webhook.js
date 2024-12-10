import path from 'path';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import { PurchaseModel } from '../Models/purchaseModel.js';
import { ObjectId } from 'mongodb';
import Users from '../Models/userModel.js';

const webhook = async (req, res) => {
	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
		const sig = req.headers['stripe-signature'];

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

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;
			const userId = session.metadata.userId;
			const productId = session.metadata.programId;
			const boughtPrice = session.metadata.boughtPrice;
			await PurchaseModel.updateOne(
				{ userId: new ObjectId(userId) },
				{ $set: { status: 'completed' } }
			);
			const purchaseData = {
				productId,
				boughtPrice,
			};
			await Users.findByIdAndUpdate(userId, {
				$push: { purchases: purchaseData },
			});
		} else if (event.type === 'checkout.session.expired') {
			const expiredSession = event.data.object;
			await PurchaseModel.updateOne(
				{ stripeSessionId: expiredSession.id },
				{
					$set: {
						status: 'expired',
					},
				}
			);
		}

		res.sendStatus(200);
	} catch (error) {
		console.log('webhook error', error);
	}
};

export default webhook;
