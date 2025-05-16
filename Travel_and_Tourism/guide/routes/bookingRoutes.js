const express = require('express');
const router = express.Router();

router.post('/book-guide', async (req, res) => {
  try {
    const { guideId, tourDate, numberOfPeople, phoneNumber, email } = req.body;

    // Check if all required fields are provided
    if (!guideId || !tourDate || !numberOfPeople || !phoneNumber || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Logic for booking the guide (e.g., saving to a database)
    const booking = await Booking.create({ guideId, tourDate, numberOfPeople, phoneNumber, email });

    if (booking) {
      return res.status(201).json({ message: 'Guide booked successfully', booking });
    } else {
      throw new Error('Error booking guide');
    }

  } catch (error) {
    console.error('Booking Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { otp, bookingId } = req.body;

    // Check if OTP and booking ID are valid
    if (!otp || !bookingId) {
      return res.status(400).json({ message: 'OTP and Booking ID are required' });
    }

    // Logic for verifying OTP
    const booking = await Booking.findById(bookingId);
    if (booking && booking.otp === otp) {
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

  } catch (error) {
    console.error('OTP Verification Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
