const express = require('express');
const Scan = require('../models/Scan');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { text } = req.body;
     // Abhi ke liye dummy logic — baad mein ML API call yahan aayega
    const isScam = text.toLowerCase().includes('otp') || text.toLowerCase().includes('kyc');

    const scan = new Scan({
      text,
      verdict: isScam ? 'Scam' : 'Safe',
      confidence: isScam ? 92 : 85,
      reason: isScam ? 'Contains suspicious keywords like OTP or KYC' : 'No suspicious patterns found',
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