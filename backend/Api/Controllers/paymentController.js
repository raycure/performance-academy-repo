import Stripe from 'stripe';
import LesMillsEvents from '../../assets/programs.js';
import jwt from 'jsonwebtoken';
import { EventPurchaseModel, ExamFeeModel } from '../Models/purchaseModel.js';
import Users from '../Models/userModel.js';
import * as dotenv from 'dotenv';
dotenv.config();

const payment = async (req, res) => {
	const decoded = jwt.decode(req.user);
	const userId = decoded.userId;
	const { purchaseType } = req.body;
	const itemId = req.body.id;

	try {
		let url;
		switch (purchaseType) {
			case 'productPurchase':
				url = await createProductPurchaseSession(itemId, userId, purchaseType);
				break;
			case 'payExamFee':
				url = await createPayExamFeeSession(itemId, userId, purchaseType);
				break;
			default:
				break;
		}

		res.json({
			url: url,
			message: 'Payment session created',
			accessToken: req.user,
		});
	} catch (error) {
		console.error('Payment creation error:', error);
		res.status(500).json({ error: error.message });
	}
};

const createProductPurchaseSession = async (itemId, userId, purchaseType) => {
	const foundItem = LesMillsEvents.find((event) => event.id === itemId);
	const productPrice = foundItem.price * 100;
	const metadata = {
		userId,
		eventId: foundItem.id,
		boughtPrice: foundItem.price,
		foundItem: JSON.stringify(foundItem),
		purchaseType,
	};
	const foundUser = await Users.findById(userId);
	try {
		if (!foundUser.verifiedMail) {
			throw new Error('verify email first');
		}
		if (!foundUser.verifiedContract) {
			throw new Error('verify contract first');
		}
		const foundPurchase = foundUser.findPurchase(itemId);
		if (foundPurchase) {
			throw new Error('product already bought');
		}
	} catch (purchaseError) {
		return res.status(400).json({
			success: false,
			message: purchaseError.message,
		});
	}
	const productName = 'exam fee';
	const session = await createPaymentSession(
		metadata,
		productName,
		productPrice
	);
	try {
		await EventPurchaseModel.create({
			userId: userId,
			eventId: itemId,
			boughtPrice: productPrice,
			status: 'pending',
			stripeSessionId: session.id,
		});
	} catch (error) {
		console.log('error in PurchaseModel', error);
	}
	return session.url;
};
const createPayExamFeeSession = async (itemId, userId, purchaseType) => {
	const foundUser = await Users.findById(userId);
	await foundUser.addExamAttempt(itemId);
	const metadata = { itemId, userId, purchaseType };
	const productName = 'exam fee';
	const productPrice = 5000;
	const session = await createPaymentSession(
		metadata,
		productName,
		productPrice
	);
	try {
		await ExamFeeModel.create({
			userId: userId,
			eventId: itemId,
			boughtPrice: productPrice,
			status: 'pending',
			stripeSessionId: session.id,
		});
	} catch (error) {
		console.log('error in PurchaseModel', error);
	}
	return session.url;
};

const createPaymentSession = async (metadata, productName, productPrice) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		mode: 'payment',
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: productName,
					},
					unit_amount: productPrice,
				},
				quantity: 1,
			},
		],
		metadata,
		expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes from now
		success_url:
			process.env.ENVIRONMENT === 'development'
				? // todo give proper links
				  `${process.env.DEV_FRONTEND_BASE_LINK}program`
				: `${process.env.PROD_FRONTEND_BASE_LINK}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url:
			process.env.ENVIRONMENT === 'development'
				? `${process.env.DEV_FRONTEND_BASE_LINK}`
				: `${process.env.PROD_FRONTEND_BASE_LINK}/cancel`,
	});
	// stripe.checkout.sessions.expire(session.id); // todo delete it for test purposes expire the session
	return session;
};

export default payment;
