import express from 'express';
import handleRefreshToken from '../Controllers/refreshTokenController.js';

const router = express.Router();
router.get('/', handleRefreshToken);

export default router;