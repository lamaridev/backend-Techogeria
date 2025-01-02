const mongoose = require('mongoose');

const CodeTrackSchema = new mongoose.Schema({
  phoneForSaleID: { type: mongoose.Schema.Types.ObjectId, ref: 'PhoneForSale', required: true },
  password: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CodeTrack', CodeTrackSchema);
