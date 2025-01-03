import Stripe from 'stripe';
import LesMillsEvents from '../../assets/programs.js';
import jwt from 'jsonwebtoken';
import { EventPurchaseModel, ExamFeeModel } from '../Models/purchaseModel.js';
import Users from '../Models/userModel.js';
import * as dotenv from 'dotenv';
dotenv.config();

const payment = async (req, res) => {
	const userId = req.userId;
	const { purchaseType } = req.body;
	const itemId = req.body.id;
	const language = req.language;

	try {
		let url;
		switch (purchaseType) {
			case 'productPurchase':
				url = await createProductPurchaseSession(
					itemId,
					userId,
					purchaseType,
					language
				);
				break;
			case 'payExamFee':
				url = await createPayExamFeeSession(
					itemId,
					userId,
					purchaseType,
					language
				);
				break;
			default:
				break;
		}

		res.json({
			url: url,
			message: 'Payment session created',
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.error('Payment creation error:', error);
		res
			.status(500)
			.json({ message: res.__(`${error.message}`), duration: 50000 });
	}
};

const createProductPurchaseSession = async (
	itemId,
	userId,
	purchaseType,
	language
) => {
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
	if (!foundUser) {
		throw new Error('paymentResponses.userNotFound');
	}
	if (!foundUser.verifiedMail) {
		console.log('email not verified', foundUser.verifiedMail);

		throw new Error('paymentResponses.emailNotVerified');
	}
	if (foundUser.verifiedContract === 'null') {
		throw new Error('paymentResponses.contractNotVerified');
	}
	const foundPurchase = foundUser.findPurchase(itemId);
	if (foundPurchase) {
		throw new Error('paymentResponses.duplicatePurchase');
	}
	const productName = foundItem.title;
	const session = await createPaymentSession(
		metadata,
		productName,
		productPrice,
		language
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

const createPaymentSession = async (
	metadata,
	productName,
	productPrice,
	language
) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
	let message = language === 'tr' ? 'Ödeme başarılı' : 'Payment successful';
	let errMessage = language === 'tr' ? 'Ödeme başarısız' : 'Payment failed';
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
				? `${process.env.DEV_FRONTEND_BASE_LINK}${encodeURIComponent(
						'programlarım'
				  )}?status=success&message=${encodeURIComponent(message)}`
				: `${process.env.PROD_FRONTEND_BASE_LINK}${encodeURIComponent(
						'programlarım'
				  )}?status=error&message=${encodeURIComponent(errMessage)}`,

		cancel_url:
			process.env.ENVIRONMENT === 'development'
				? `${process.env.DEV_FRONTEND_BASE_LINK}`
				: `${process.env.PROD_FRONTEND_BASE_LINK}`,
	});
	return session;
};

export default payment;
