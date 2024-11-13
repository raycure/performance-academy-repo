import express from 'express';
import userInfo from '../Controllers/userInfoController';

const router = express.Router();

router.get('/', userInfo);
// todo not sure if its get or post here

export default router;
