const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  availability: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
