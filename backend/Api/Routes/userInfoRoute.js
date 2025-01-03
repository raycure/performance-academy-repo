import express from 'express';
import {
	userInfoFetchController,
	userInfoPutController,
	deleteAccount,
} from '../Controllers/userInfoController.js';
import sendVerificationEmail from '../Controllers/sendVerificationEmail.js';

const router = express.Router();

router.get('/', userInfoFetchController);
router.post('/', userInfoPutController);
router.post('/deleteAccount', deleteAccount);
router.post('/sendVerificationMail', sendVerificationEmail);

export default router;
