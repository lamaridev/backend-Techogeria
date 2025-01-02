const CodeTrack = require('../models/CodeTrack');
const PhoneForSale = require('../models/PhoneForSale');


// Get a specific code track by ID or code
exports.getCodeTrackById = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID or code from request parameters
    const codeTrack = await CodeTrack.findOne({ password: id }).populate('phoneForSaleID'); // Replace with `findOne({ code: id })` if using code as unique field
    if (!codeTrack) {
      return res.status(404).json({ message: 'Code track not found' });
    }

    res.status(200).json(codeTrack);
  } catch (error) {
    console.error('Error retrieving code track:', error);
    res.status(500).json({ message: 'Failed to retrieve code track', error });
  }
};
exports.createCodeTrack = async (req, res) => {
  try {
    const { phoneForSaleID, password } = req.body;

    
    const phoneForSale = await PhoneForSale.findById(phoneForSaleID);
    if (!phoneForSale) {
      return res.status(404).json({ message: 'Phone for sale not found' });
    }

   
    const newCodeTrack = new CodeTrack({
      phoneForSaleID,
      password: password,
    });

    await newCodeTrack.save();

    res.status(201).json({ message: 'CodeTrack created successfully', codeTrack: newCodeTrack });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllCodeTracks = async (req, res) => {
  try {
    const codeTracks = await CodeTrack.find().populate('phoneForSaleID');
    res.json({ message: 'CodeTrack entries retrieved successfully', codeTracks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCodeTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const codeTrack = await CodeTrack.findOne({ password: id });
    if (!codeTrack) {
      return res.status(404).json({ message: 'CodeTrack not found' });
    }

    codeTrack.status = 'deleted'; 
    await codeTrack.save();

    res.json({ message: 'CodeTrack status updated to deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateCodeTrack = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from request parameters
    const updateData = req.body; // Get the data to update from the request body

    const codeTrack = await CodeTrack.findOne({ password: id });
    if (!codeTrack) {
      return res.status(404).json({ message: 'CodeTrack not found' });
    }

    // Update the code track with new data
    Object.assign(codeTrack, updateData);
    await codeTrack.save();

    res.json({ message: 'CodeTrack updated successfully', codeTrack });
  } catch (error) {
    console.error('Error updating code track:', error);
    res.status(500).json({ message: 'Failed to update code track', error });
  }
};


exports.verifyCodeTrack = async (req, res) => {
  try {
    const { id, password } = req.body;

    
    const codeTrack = await CodeTrack.findById(id);
    if (!codeTrack) {
      return res.status(404).json({ message: 'CodeTrack not found' });
    }

    
    const isMatch = await bcrypt.compare(password, codeTrack.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.json({ message: 'Password verified successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
