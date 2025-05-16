const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// POST - Create a new bus booking
router.post('/book', async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error booking bus', error });
  }
});

module.exports = router;
