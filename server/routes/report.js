const express = require('express');
const Report = require('../models/Report');

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const { text, reportedAs } = req.body;
        const report = new Report({ text, reportedAs });
        await report.save();
        res.status(201).json(report);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;