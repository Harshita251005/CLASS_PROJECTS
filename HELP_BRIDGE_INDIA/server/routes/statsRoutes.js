const express = require('express');
const router = express.Router();
const HelpRequest = require('../models/HelpRequest');
const Volunteer = require('../models/Volunteer');
const NGO = require('../models/NGO');

// @desc    Get platform statistics
// @route   GET /api/stats
router.get('/', async (req, res) => {
  try {
    const volunteersCount = await Volunteer.countDocuments();
    const requestsFulfilledCount = await HelpRequest.countDocuments({ status: 'Fulfilled' });
    const ngosCount = await NGO.countDocuments();

    res.json({
      volunteers: volunteersCount,
      requestsFulfilled: requestsFulfilledCount,
      ngos: ngosCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
