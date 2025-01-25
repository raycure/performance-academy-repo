import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
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
import updateConsent from './Routes/updateConsent.js';
import ipBlockChecker from './Middleware/ipBlockChecker.js';
import * as dotenv from 'dotenv';
import webhook from './Controllers/webhook.js';
import i18n from '../config/i18n.js';
import Users from './Models/userModel.js';
import { ObjectId } from 'mongodb';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = 3001;
// very important note if a controller requires authmiddleware it has to return accesstoken by accessing req.accessToken
const app = express();
app.use(credentials);
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(i18n.init);
app.use('/webhook', express.raw({ type: 'application/json' }));
app.post('/webhook', webhook);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/pay', authMiddleware, paymentRoute);

// const limiter = rateLimit({
// 	windowMs: 1000 * 60 * 60,
// 	max: 200,
// 	handler: (req, res, next) => {
// 		res.status(429).json({
// 			message: 'Too many requests, please try again later.',
// 		});
// 	},
// });

app.use('/blockIp', blockIpRoute);
app.use(ipBlockChecker);
// app.use(limiter);
app.use('/register', registerRoute);
app.use('/', loginRoute);
app.use('/logout', logoutRoute);
app.use('/updateConsent', authMiddleware, updateConsent);
app.use('/', verifyMailRoute);
app.use('/userInfo', authMiddleware, userInfoRoute);
app.use('/submitContactForm', contactFormRoute);
app.use('/upload', uploadRoute);
app.use('/testRoute', async function test() {
	const foundUser = await Users.findById('678a760b621f15de4ffe3bf3');
	try {
		const examType = 'examAttempts';
		const itemId = 'BODYPUMP_2025-02-01_2025-02-02_true';
		await foundUser.addExamAttempt(itemId, examType);
	} catch (error) {
		console.log('err', error);
	}
});
app.use(express.static(path.join(__dirname, '../../dist')));
// This should be the LAST route
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log('connected');
		app.listen(PORT, () => {
			console.log('port 3001');
		});
	})
	.catch((error) => {
		console.log('error', error);
		console.log('didnt connect');
	});

export default app;
