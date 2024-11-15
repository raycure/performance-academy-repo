import express from 'express';
import contectFormController from '../Controllers/contectFormController.js';
const router = express.Router();

router.post('/', contectFormController);

export default router;
