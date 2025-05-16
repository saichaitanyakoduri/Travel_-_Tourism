const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

// POST - Create a new flight booking
router.post('/book', async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ message: 'Error booking flight', error });
  }
});

module.exports = router;
