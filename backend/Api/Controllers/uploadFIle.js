import multer from 'multer';
import path from 'path';
import sanitizePdf from '../../Utils/sanitize-pdf.js';
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
		path: {
			type: String,
			required: true,
		},
		mimetype: {
			type: String,
			required: true,
		},
		size: {
			type: Number,
			required: true,
		},
		uploadDate: {
			type: Date,
			default: Date.now,
		},
		hash: {
			type: String,
		},
		uploadedBy: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const File = mongoose.model('File', fileSchema);

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
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
		const sanitizedPdf = await sanitizePdf(req.file);

		//todo while making the request make sure the req contains these infos
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
			error: process.env.NODE_ENV === 'development' ? err.message : undefined,
		});
	}
};

export { upload, uploadFile, File };
