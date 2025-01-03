import multer from 'multer';
import fs from 'fs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileSchema = new mongoose.Schema(
	{
		filename: {
			type: String,
			required: true,
		},
		originalName: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		uploadedBy: {
			type: String,
			default: 'anonymous',
		},
	},
	{
		timestamps: true,
	}
);
const File = mongoose.model('File', fileSchema);
// Setup upload directory
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}
// Log directory status on startup
// console.log('Upload directory:', uploadDir);
// console.log('Directory exists:', fs.existsSync(uploadDir));
try {
	fs.accessSync(uploadDir, fs.constants.W_OK);
	// console.log('Directory is writable');
} catch (err) {
	// console.log('Directory is not writable:', err);
}
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
		);
	},
});
const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype !== 'application/pdf') {
			return cb(new Error('Only PDF files are allowed!'), false);
		}
		cb(null, true);
	},
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
});
const uploadFile = async (req, res) => {
	try {
		// console.log('Starting file upload...');
		// console.log('Request file:', req.file);
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}
		const files = await fs.promises.readdir(uploadDir);
		// console.log('Files in upload directory:', files);
		const fileContent = await fs.promises.readFile(req.file.path);
		// console.log('File size from read:', fileContent.length);
		try {
			const stats = await fs.promises.stat(req.file.path);
			// console.log('File stats:', stats);
		} catch (err) {
			console.error('File does not exist after upload:', err);
			return res.status(500).json({
				message: 'File upload failed - file not saved to disk',
				error: err.message,
			});
		}
		const newFile = new File({
			filename: req.file.filename,
			originalName: req.file.originalname,
			size: req.file.size,
			uploadedBy: req.user?.id || 'anonymous',
		});
		await newFile.save();
		// console.log('File saved to database:', newFile);
		res.status(200).json({
			message: 'File uploaded successfully',
			file: {
				id: newFile._id,
				filename: newFile.filename,
				originalName: newFile.originalName,
				size: newFile.size,
				uploadDate: newFile.createdAt,
			},
		});
	} catch (err) {
		console.error('Error uploading file:', err);
		console.error('Error stack:', err.stack);
		res.status(500).json({
			message: 'Internal Server Error',
			error: err.message,
		});
	}
};
const handleMulterError = (error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		if (error.code === 'LIMIT_FILE_SIZE') {
			return res.status(400).json({
				success: false,
				message: 'File size exceeds limit',
			});
		}
		return res.status(400).json({
			success: false,
			message: 'Please upload a valid file',
		});
	}
	if (error.message === 'Only PDF files are allowed!') {
		return res.status(400).json({
			success: false,
			message: 'Please upload a PDF file',
		});
	}
	next(error);
};
export { upload, uploadFile, handleMulterError, File };
