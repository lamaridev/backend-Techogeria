const PhoneForSale = require('../models/PhoneForSale');
const CodeTrack = require('../models/CodeTrack');



exports.createPhoneForSale = async (req, res) => {
  try {

    const phoneData = req.body;


    // Extract image paths from uploaded files
    const imagePaths = req.cloudinaryUrls; // Image URL from Cloudinary middleware

    // Include image paths in the phone data
    phoneData.images = imagePaths;


    const newPhoneForSale = new PhoneForSale(phoneData);
    await newPhoneForSale.save();

    res.status(201).json({ message: 'Phone listed for sale successfully', phone: newPhoneForSale });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.editPhoneForSale = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPhone = await PhoneForSale.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPhone) {
      return res.status(404).json({ message: 'Phone for sale not found' });
    }

    res.json({ message: 'Phone for sale updated successfully', phone: updatedPhone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deletePhoneForSale = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPhone = await PhoneForSale.findByIdAndDelete(id);
    if (!deletedPhone) {
      return res.status(404).json({ message: 'Phone for sale not found' });
    }

    res.json({ message: 'Phone for sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.filterPhonesForSale = async (req, res) => {
  try {
    const filterCriteria = req.body;

    const phones = await PhoneForSale.find(filterCriteria);
    if (phones.length === 0) {
      return res.status(404).json({ message: 'No phones match the criteria' });
    }

    res.json({ message: 'Filtered phones for sale retrieved successfully', phones });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.markAsSold = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPhone = await PhoneForSale.findByIdAndUpdate(
      id,
      { status: 'sold' },
      { new: true }
    );

    if (!updatedPhone) {
      return res.status(404).json({ message: 'Phone for sale not found' });
    }

    res.json({ message: 'Phone marked as sold', phone: updatedPhone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAvailablePhones = async (req, res) => {
  try {
    const codeTracks = await CodeTrack.find({ status: 'accepted' }).populate('phoneForSaleID');
    const availablePhones = codeTracks.map(track => track.phoneForSaleID);
    (availablePhones); 
    res.json({ message: 'CodeTrack entries retrieved successfully', phones: availablePhones });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
