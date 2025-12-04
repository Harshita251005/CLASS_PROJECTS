const mongoose = require('mongoose');

const helpRequestSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, default: 'Open', enum: ['Open', 'Fulfilled'] },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.model('HelpRequest', helpRequestSchema);
