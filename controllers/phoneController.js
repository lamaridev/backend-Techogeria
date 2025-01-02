const Phone = require('../models/Phone');



exports.createPhone = async (req, res) => {
  try {
    const phoneData = req.body; // Extract all fields from the request body
    const imageUrl = req.cloudinaryUrl; // Image URL from Cloudinary middleware

    // Attach the image URL to the phone data
    phoneData.image = imageUrl;
 
    // Create a new Phone document
    const newPhone = new Phone(phoneData);
    await newPhone.save();

    res.status(201).json({
      message: 'Phone created successfully',
      phone: newPhone,
    });
  } catch (error) {
    console.error('Error creating phone:', error);
    res.status(400).json({
      message: 'Failed to create phone',
      error: error.message,
    });
  }
};



exports.deletePhone = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPhone = await Phone.findByIdAndDelete(id);
    if (!deletedPhone) {
      return res.status(404).json({ message: 'Phone not found' });
    }

    res.json({ message: 'Phone deleted successfully', phone: deletedPhone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.editPhone = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPhone = await Phone.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedPhone) {
      return res.status(404).json({ message: 'Phone not found' });
    }

    res.json({ message: 'Phone updated successfully', phone: updatedPhone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.filterPhones = async (req, res) => {
  try {
    const filterCriteria = req.body; 

    const phones = await Phone.find(filterCriteria);

    if (phones.length === 0) {
      return res.status(404).json({ message: 'No phones match the criteria' });
    }

    res.json({ message: 'Filtered phones retrieved successfully', phones });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to get all phones
exports.getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.find(); // Fetch all phones from the database
    res.status(200).json({
      message: 'All phones retrieved successfully',
      phones,
    });
  } catch (error) {
    console.error('Error fetching phones:', error);
    res.status(500).json({
      message: 'Failed to fetch phones',
      error: error.message,
    });
  }
};