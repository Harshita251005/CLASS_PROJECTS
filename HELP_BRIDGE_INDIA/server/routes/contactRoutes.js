const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
