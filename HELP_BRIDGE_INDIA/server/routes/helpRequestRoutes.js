const express = require('express');
const router = express.Router();
const HelpRequest = require('../models/HelpRequest');

// @desc    Get all help requests
// @route   GET /api/help-requests
router.get('/', async (req, res) => {
  try {
    const { category, city, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (city) query.city = city;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const requests = await HelpRequest.find(query).sort({ date: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a help request
// @route   POST /api/help-requests
router.post('/', async (req, res) => {
  try {
    const newRequest = new HelpRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
