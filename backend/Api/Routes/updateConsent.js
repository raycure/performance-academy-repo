import express from 'express';
import updateConsent from '../Controllers/updateConsent.js';

const router = express.Router();

router.post('/', updateConsent);

export default router;
