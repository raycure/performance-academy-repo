import express from 'express';
import verifyMail from '../Controllers/verifyMailController.js';

const router = express.Router();

router.get('/verifyMail/:token', verifyMail);

export default router;
