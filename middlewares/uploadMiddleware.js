const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // To remove temporary files after upload
require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Setup Multer for temporary file uploads
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Function to Upload a Single Image
const uploadSingleImage = [
  upload.single('image'),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'phones', // Folder name in Cloudinary
      });

      req.cloudinaryUrl = result.secure_url; // Attach the Cloudinary URL to req

      // Remove temporary file after upload
      fs.unlinkSync(req.file.path);

      next(); // Pass control to the next middleware/controller
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      return res.status(500).json({ message: 'Image upload failed', error });
    }
  }, 
];

// Function to Upload Multiple Images
const uploadMultipleImages = [
  upload.array('images', 10), // Allow up to 10 images
  async (req, res, next) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: 'phones' })
      );

      const results = await Promise.all(uploadPromises);

      req.cloudinaryUrls = results.map((result) => result.secure_url); // Attach the list of URLs to req

      // Remove temporary files after upload
      req.files.forEach((file) => fs.unlinkSync(file.path));

      next(); // Pass control to the next middleware/controller
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      return res.status(500).json({ message: 'Image upload failed', error });
    }
  },
];

module.exports = { uploadSingleImage, uploadMultipleImages };
