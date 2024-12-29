import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import registerRoute from './Routes/registerRoute.js';
import loginRoute from './Routes/loginRoute.js';
import logoutRoute from './Routes/logoutRoute.js';
import verifyMailRoute from './Routes/verifyMailRoute.js';
import cookieParser from 'cookie-parser';
import credentials from './Middleware/credentials.js';
import corsOptions from '../config/corsOptions.js';
import rateLimit from 'express-rate-limit';
import authMiddleware from './Middleware/handleAuth.js';
import uploadRoute from './Routes/uploadRoute.js';
import contactFormRoute from './Routes/contactFormRoute.js';
import userInfoRoute from './Routes/userInfoRoute.js';
import paymentRoute from './Routes/paymentRoute.js';
import blockIpRoute from './Routes/blockIpRoute.js';
import ipBlockChecker from './Middleware/ipBlockChecker.js';
import * as dotenv from 'dotenv';
import webhook from './Controllers/webhook.js';
import i18n from '../config/i18n.js';

dotenv.config();
const port = 3001;
// very important note if a controller requires authmiddleware it has to return accesstoken by accessing req.accessToken
const app = express();
app.use(credentials);
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/webhook', express.raw({ type: 'application/json' }), webhook);
app.use(i18n.init);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const limiter = rateLimit({
	windowMs: 1000 * 60 * 60,
	max: 200,
	handler: (req, res, next) => {
		res.status(429).json({
			message: 'Too many requests, please try again later.',
		});
	},
});

app.use('/blockIp', blockIpRoute);
app.use(ipBlockChecker);
app.use(limiter);
app.use('/register', registerRoute);
app.use('/', loginRoute);
app.use('/logout', logoutRoute);
app.use('/', verifyMailRoute);
app.use('/pay', authMiddleware, paymentRoute);
app.use('/userInfo', authMiddleware, userInfoRoute);
app.use('/submitContactForm', contactFormRoute);
app.use('/upload', uploadRoute);
app.use('/deleteCollections', async function dropAllCollections() {
	try {
		const collections = await mongoose.connection.db.collections();

		for (let collection of collections) {
			await collection.drop();
			console.log(`Dropped collection: ${collection.collectionName}`);
		}
		return { success: true, message: 'All collections dropped successfully' };
	} catch (error) {
		console.error('Error dropping collections:', error);
		return { success: false, error: error.message };
	}
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('connected');
		app.listen(3001, () => {
			console.log('port 3001');
		});
	})
	.catch((error) => {
		console.log('error', error);

		console.log('didnt connect');
	});

export default app;
