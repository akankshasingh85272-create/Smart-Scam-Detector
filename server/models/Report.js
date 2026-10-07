const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    text: { type: String, required: true },
    reportedAs: { type: String, enum: ['Scam', 'Safe'], required: true },
    status: { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);