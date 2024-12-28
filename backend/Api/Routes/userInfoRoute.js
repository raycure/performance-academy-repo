import express from 'express';
import {
	userInfoFetchController,
	userInfoPutController,
} from '../Controllers/userInfoController.js';
import sendVerificationEmail from '../Controllers/sendVerificationEmail.js';

const router = express.Router();

router.get('/', userInfoFetchController);
router.post('/', userInfoPutController);
router.post('/sendVerificationMail', sendVerificationEmail);

export default router;
