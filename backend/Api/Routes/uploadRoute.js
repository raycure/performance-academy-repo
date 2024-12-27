import express from 'express';
import {
	handleMulterError,
	upload,
	uploadFile,
} from '../Controllers/uploadFile.js';

const router = express.Router();

router.post('/', upload.single('file'), handleMulterError, uploadFile);

export default router;
