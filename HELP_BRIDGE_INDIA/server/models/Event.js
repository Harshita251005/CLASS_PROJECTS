const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  participants: [{ type: String }], // Store user IDs or emails/names for now
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);
