import Stripe from 'stripe';
import programs from '../../assets/programs.js';
import jwt from 'jsonwebtoken';
import { PurchaseModel } from '../Models/purchaseModel.js';
import Users from '../Models/userModel.js';
import * as dotenv from 'dotenv';
dotenv.config();

const payment = async (req, res) => {
	// const clientProgram = programs
	const title = req.body.id;

	const getItemByTitle = (programs, title) => {
		return programs.find((item) => item.title === title);
	};
	const foundItem = getItemByTitle(programs, title);
	const userFromAccessToken = jwt.decode(req.user);
	const userId = userFromAccessToken.userId.toString();
	const itemPrice = foundItem.price * 100;

	const foundUser = await Users.findById(userId);

	try {
		foundUser.checkIfItsAlreadyBought(foundItem.id);
	} catch (purchaseError) {
		return res.status(400).json({
			success: false,
			message: purchaseError.message,
		});
	}

	try {
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			mode: 'payment',
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: foundItem.title,
						},
						unit_amount: itemPrice,
					},
					quantity: 1,
				},
			],
			metadata: {
				userId: userId,
				programId: foundItem.id, // explicitely set because stripe gives a random id to every product to handle server side we use the metadata
				boughtPrice: foundItem.price,
			},
			expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes from now
			success_url:
				process.env.ENVIRONMENT === 'development'
					? `${process.env.DEV_FRONTEND_BASE_LINK}program`
					: `${process.env.PROD_FRONTEND_BASE_LINK}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url:
				process.env.ENVIRONMENT === 'development'
					? `${process.env.DEV_FRONTEND_BASE_LINK}`
					: `${process.env.PROD_FRONTEND_BASE_LINK}/cancel`,
		});
		await PurchaseModel.create({
			userId: userId,
			programId: foundItem.id,
			boughtPrice: foundItem.price,
			status: 'pending',
			stripeSessionId: session.id,
		});

		// stripe.checkout.sessions.expire(session.id); todo delete it for test purposes expire the session
		res.json({
			url: session.url,
			message: 'Payment session created',
			accessToken: req.user,
		});
	} catch (error) {
		console.error('Payment creation error:', error);
		res.status(500).json({ error: error.message });
	}
};

export default payment;
