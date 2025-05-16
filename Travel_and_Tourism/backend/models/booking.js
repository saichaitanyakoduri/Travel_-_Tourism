const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
  date: { type: Date, required: true },
  numberOfPeople: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  specialRequirements: { type: String },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Booking', bookingSchema);
