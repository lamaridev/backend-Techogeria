const express = require('express');
const router = express.Router();
const {
  createCodeTrack,
  getAllCodeTracks,
  getCodeTrackById, 
  deleteCodeTrack,
  verifyCodeTrack,
  updateCodeTrack,
} = require('../controllers/CodeTrackController');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Route to create a code track
router.post('/', createCodeTrack); 

// Route to delete a code track by ID
router.delete('/:id', deleteCodeTrack); 
router.put('/:id', authMiddleware, adminMiddleware, updateCodeTrack);

// Route to get all code tracks
router.get('/', getAllCodeTracks); 

// Route to verify a code track
router.post('/verify', authMiddleware, verifyCodeTrack); 

// Route to get a specific code track by ID or code
router.get('/:id', getCodeTrackById); // Add this line

module.exports = router;
