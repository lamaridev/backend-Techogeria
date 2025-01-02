const mongoose = require('mongoose');

const PhoneForSaleSchema = new mongoose.Schema({
  brand: String,
  type: String,
  ram: String,
  storage: String,
  battery: String,
  images: [{ type: String }],
  city: String,
  state: String,
  phone: String,
  description: String,
  status: String,
  price: Number,
});

module.exports = mongoose.model('PhoneForSale', PhoneForSaleSchema);
