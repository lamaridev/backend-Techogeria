const express = require('express');
const router = express.Router();
const {
  createPhoneForSale,
  editPhoneForSale,
  deletePhoneForSale,
  filterPhonesForSale,
  markAsSold,
  getAvailablePhones,
} = require('../controllers/PhoneForSaleController');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const {uploadMultipleImages} = require('../middlewares/uploadMiddleware');

router.get('/available', getAvailablePhones);
router.post('/',uploadMultipleImages, createPhoneForSale);
router.put('/:id', authMiddleware, adminMiddleware, editPhoneForSale);
router.delete('/:id', authMiddleware, adminMiddleware, deletePhoneForSale);
router.put('/sold/:id', authMiddleware, adminMiddleware, markAsSold);
router.post('/filter', authMiddleware, filterPhonesForSale);

module.exports = router;
