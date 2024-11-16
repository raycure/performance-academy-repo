import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import registerRoute from './Routes/registerRoute.js';
import loginRoute from './Routes/loginRoute.js';
import jwtRefresRoute from './Routes/jwtRefresRoute.js';
import testRoute from './Routes/testRoute.js';
import logoutRoute from './Routes/logoutRoute.js';
import verifyMailRoute from './Routes/verifyMailRoute.js';
import cookieParser from 'cookie-parser';
import credentials from './Middleware/credentials.js';
import corsOptions from '../config/corsOptions.js';
import rateLimit from 'express-rate-limit';
// import verifyJWT from './Middleware/verifyJWT.js';
import authMiddleware from './Middleware/handleAuth.js';
// import uploadRoute from './Routes/uploadRoute.js';
import contactFormRoute from './Routes/contactFormRoute.js';
// import userInfoRoute from './Routes/userInfoRoute.js';

const port = 3001;

const app = express();

app.use(credentials);

// app.set("trust proxy",1) for production dont know what it does though
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
	windowMs: 1000 * 60 * 60,
	max: 100,
	handler: (req, res, next) => {
		res.status(429).json({
			message: 'Too many requests, please try again later.',
		});
	},
});

app.use('/', limiter);
// app.use('/upload', uploadRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/refresh', jwtRefresRoute);
app.use('/logout', logoutRoute);
app.use('/', verifyMailRoute);
// app.use('/userInfo', userInfoRoute);
// todo add verifyjwt for info
app.use('/submitContactForm', authMiddleware, contactFormRoute);
// app.use(verifyJWT);
app.use('/test', testRoute);

mongoose
	.connect(
		'mongodb+srv://devemresr:IHybYDDzzbfGdcGe@performance-academy.2x7gw.mongodb.net/Performance_Academy?retryWrites=true&w=majority&appName=Performance-Academy'
	)
	.then(() => {
		console.log('connected');
		app.listen(3001, () => {
			console.log('port 3001');
		});
	})
	.catch(() => {
		console.log('didnt connect');
	});

export default app;
