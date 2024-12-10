import express from 'express';
import payment from '../Controllers/paymentController.js';
import getPaidProducts from '../Controllers/getPaidProducts.js';
import webhook from '../Controllers/webhook.js';

const router = express.Router();

router.post('/', payment);
router.get('/', getPaidProducts);
router.post('/', webhook);

export default router;
