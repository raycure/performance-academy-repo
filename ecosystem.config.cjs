module.exports = {
	apps: [
		{
			name: 'index',
			script: './backend/Api/index.js',
			env: {
				ACCESS_TOKEN_SECRET:
					'hCs3MU0wvuMAKiIpY2UcR1AhVI6MXOh5RG8Q6Jc4YR5R3zc6Zi8aWjmbR55GmAtg',
				REFRESH_TOKEN_SECRET:
					'eYhVkJhkClQsFM6q5EOJGcGyQuLzjJw7FADQVK3FkpuepLTDapJbeRf7O7makIcf',
				MAIL_TOKEN_SECRET:
					'6Umo4hYYKMC4e91vGHuqXGuXcPFx7UMoyHRmmJTLmh0RDpyiYaBVgHEGuBsFoUH9',
				DEV_EMAIL_CONFIRMATION_LINK: 'http://localhost:3001/verifyMail',
				MONGODB_URI:
					'mongodb+srv://devemresr:IHybYDDzzbfGdcGe@performance-academy.2x7gw.mongodb.net/Performance_Academy?retryWrites=true&w=majority&appName=Performance-Academy',
				ENVIRONMENT: 'production',
				DEV_FRONTEND_BASE_LINK: 'http://localhost:5173/',
				STRIPE_WEBHOOK_SECRET: 'whsec_cdPbSEV7pMsAhhibKs7SE6euTvMdI2pE',
				STRIPE_SECRET_KEY:
					'sk_test_51QKJhSLSaORsmOrrswTs7ZbhMdDVyyW3aVfi7yPBYgFYUyLGky2ph2d7iKLYeWCK2UeC4YnaT5xZfxviNHZHj0u700llQmurbP',

				DEV_RESET_PASSWORD_LINK: 'http://localhost:5173/forgotPassword',
				PROD_EMAIL_ACTIVATION_LINK: 'https://infopfa/verifyMail',
				PROD_RESET_PASSWORD_LINK: 'https://infopfa/şifremi-unuttum',
				PROD_FRONTEND_BASE_LINK: 'https://infopfa.com/',
			},
		},
	],
};
