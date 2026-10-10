const express = require('express');
const axios = require('axios');
const Scan = require('../models/Scan');

const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { text } = req.body;
    const mlResponse = await axios.post('http://127.0.0.1:8000/predict', { text });
    const { verdict, confidence } = mlResponse.data;


    const scan = new Scan({
      text,
      verdict,
      confidence,
      reason: verdict === 'Scam' ? 'Flagged by ML model based on message patterns' : 'No scam indicators found',
    });

    await scan.save();
    res.status(201).json(scan);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const scans = await Scan.find().sort({ createdAt: -1 });
    res.status(200).json(scans);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;