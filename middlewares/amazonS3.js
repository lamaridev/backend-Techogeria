// image.js

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Add your AWS Access Key
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Add your AWS Secret Key
  region: process.env.AWS_REGION, // Add your AWS Region
});

const s3 = new AWS.S3();

// Multer middleware for S3 image uploads
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME, // Your bucket name
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueName = Date.now().toString() + '-' + file.originalname;
      cb(null, uniqueName); // File name in S3
    },
  }),
  fileFilter: (req, file, cb) => {
    // Only allow certain file types (e.g., images)
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;
