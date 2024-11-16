import express from 'express';
import handleRefreshToken from '../Controllers/refreshJwt.js';

const router = express.Router();
router.get('/', handleRefreshToken);

export default router;
