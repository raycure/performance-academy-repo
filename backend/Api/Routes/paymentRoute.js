import express from 'express';
import payment from '../Controllers/paymentController.js';
import webhook from '../Controllers/webhook.js';

const router = express.Router();

router.post('/', payment);
router.post('/', webhook);

export default router;
