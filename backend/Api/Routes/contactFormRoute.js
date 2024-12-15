import express from 'express';
import {
	publicContactFormController,
	protectedContactFormController,
} from '../Controllers/contactFormController.js';
const router = express.Router();
import authMiddleware from '../Middleware/handleAuth.js';

router.post('/public', publicContactFormController);
router.post('/protected', authMiddleware, protectedContactFormController);

export default router;
