const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide', required: true },
  tourDate: { type: Date, required: true },
  numberOfPeople: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  otp: { type: String, required: true },
  status: { type: String, default: 'pending' }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
