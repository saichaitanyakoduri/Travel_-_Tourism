const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// POST - Create a new train booking
router.post('/book', async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ message: 'Error booking train', error });
  }
});

module.exports = router;
