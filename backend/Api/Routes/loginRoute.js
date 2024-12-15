import express from 'express';
import { admingLogin, login } from '../Controllers/loginController.js';
import sendForgotPasswordEmail from '../Controllers/sendForgotPasswordEmail.js';
import forgotPasswordController from '../Controllers/forgotPasswordController.js';

const router = express.Router();

router.post('/login', login);
router.post('/adminLogin', admingLogin);
router.post('/forgotPassword', sendForgotPasswordEmail);
router.post('/forgotPassword/:token', forgotPasswordController);

export default router;
