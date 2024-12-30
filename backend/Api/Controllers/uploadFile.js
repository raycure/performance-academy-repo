import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';

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
		},
	},
	{
		timestamps: true,
	}
);

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true });
}

const File = mongoose.model('File', fileSchema);

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
		if (file.mimetype === 'application/pdf') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only PDF files are allowed!'));
		}
		if (file.size > 5 * 1024 * 1024) {
			throw new Error('too large file');
		}
	},
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

const uploadFile = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}

		//todo while making the request make sure the req contains these info
		const newFile = new File({
			filename: req.file.filename,
			originalName: req.file.originalname,
			path: req.file.path,
			mimetype: req.file.mimetype,
			size: req.file.size,
			uploadedBy: req.user?.id || 'anonymous',
		});

		await newFile.save();

		res.status(200).json({
			message: 'File uploaded successfully',
			file: {
				id: newFile._id,
				filename: newFile.filename,
				originalName: newFile.originalName,
				size: newFile.size,
				uploadDate: newFile.uploadDate,
			},
		});
	} catch (err) {
		console.error('Error uploading file:', err);
		res.status(500).json({
			message: 'Internal Server Error',
			err: err.message,
		});
	}
};

const handleMulterError = (error, req, res, next) => {
	if (error instanceof multer.MulterError) {
		if (error.code === 'LIMIT_FILE_SIZE') {
			return res.status(400).json({
				success: false,
				message: res.__('fileUploadResponses.fileSizeExceeded'),
			});
		}
		return res.status(400).json({
			success: false,
			message: res.__('fileUploadResponses.pleaseUploadFile'),
		});
	}

	if (error.message === 'Only PDF files are allowed!') {
		return res.status(400).json({
			success: false,
			message: res.__('fileUploadResponses.pleaseUploadFile'),
		});
	}

	next(error);
};

export { upload, uploadFile, handleMulterError, File };
