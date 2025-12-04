const mongoose = require('mongoose');

const ngoSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  verified: { type: Boolean, default: false },
}, {
  timestamps: true,
});

module.exports = mongoose.model('NGO', ngoSchema);
