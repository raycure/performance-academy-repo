import allowedOrigins from './allowedOrigins.js';

const corsOptions = {
	origin: (origin, callback) => {
		console.log('Origin:', origin);
		const timestamp = new Date().toISOString();
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			console.log('CORS error at', timestamp, 'for origin:', origin);
			callback(null, true);
			// callback(new Error('Not allowed by CORS'));
		}
	},
	exposedHeaders: ['ip-blocked', 'x-refreshed-token'],
	credentials: true,
	optionsSuccessStatus: 200,
};

export default corsOptions;
