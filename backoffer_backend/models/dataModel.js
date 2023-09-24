const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  Intensity: String,
  Likelihood: String,
  Relevance: String,
  Year: Number,
  Country: String,
  Topics: [String],
  Region: String,
  City: String,
  // Add other fields based on your JSON data
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
