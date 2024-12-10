import express from 'express';
import blockIp from '../Middleware/blockIp.js';

const router = express.Router();
router.post('/', blockIp);

export default router;
