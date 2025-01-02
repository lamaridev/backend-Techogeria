const express = require('express');
const router = express.Router();

const {
  createPhone,
  deletePhone,
  editPhone,
  filterPhones,
  getAllPhones, // Import the new controller
} = require('../controllers/phoneController');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {uploadSingleImage} = require('../middlewares/uploadMiddleware'); // Import middleware

// Routes
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  uploadSingleImage, // Upload image and attach Cloudinary URL
  createPhone       // Controller receives req.cloudinaryUrl
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  editPhone
);

router.delete('/:id', authMiddleware, adminMiddleware, deletePhone);

router.post('/filter', authMiddleware, filterPhones);

// Route for getting all phones
router.get('/', getAllPhones);

module.exports = router;
