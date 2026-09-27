const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
  verdict: { type: String, required: true },
  confidence: { type: Number, required: true },
  reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Scan', scanSchema);