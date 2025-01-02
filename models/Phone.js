const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const PhoneSchema = new mongoose.Schema({
  idPhone: { type: String, unique: true, default: uuidv4 }, // Generate a unique ID by default
  name: { type: String, required: true },
  marque: String,
  performance: Number,
  cameraScore: Number,
  batteryScore: Number,
  cpu: String,
  gpu: String,
  ram: String,
  storage: String,
  frontCamera: String,
  rearCamera: String,
  display: String,
  battery: String,
  price: Number,
  osystm:String,
  status: { type: String, required: true },
  image: String,
});

module.exports = mongoose.model('Phone', PhoneSchema);
