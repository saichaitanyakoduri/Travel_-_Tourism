const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  date: { type: Date, required: true },
  passengers: { type: Number, required: true },
  travelType: { type: String, default: 'one-way' },
});

module.exports = mongoose.model('Cab', cabSchema);
