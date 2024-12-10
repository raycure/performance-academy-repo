import express from 'express';
import {
	userInfoFetchController,
	userInfoPutController,
} from '../Controllers/userInfoController.js';

const router = express.Router();

router.get('/', userInfoFetchController);
router.post('/', userInfoPutController);

export default router;
