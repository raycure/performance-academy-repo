import express from 'express';
import { admingLogin, login } from '../Controllers/loginController.js';

const router = express.Router();

router.post('/login', login);
router.post('/adminLogin', admingLogin);

export default router;
