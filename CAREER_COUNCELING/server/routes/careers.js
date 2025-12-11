const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST /api/careers/save
// @desc    Save a career to favorites
// @access  Private
router.post('/save', protect, async (req, res) => {
  const { careerId, careerTitle } = req.body;

  try {
    const user = await User.findById(req.user._id);

    // Check if career already saved
    const alreadySaved = user.savedCareers.find(
      career => career.careerId === careerId
    );

    if (alreadySaved) {
      return res.status(400).json({ message: 'Career already saved' });
    }

    user.savedCareers.push({
      careerId,
      careerTitle,
      savedAt: new Date()
    });

    await user.save();

    res.status(201).json({
      message: 'Career saved successfully',
      savedCareers: user.savedCareers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/careers/save/:careerId
// @desc    Remove saved career
// @access  Private
router.delete('/save/:careerId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.savedCareers = user.savedCareers.filter(
      career => career.careerId !== req.params.careerId
    );

    await user.save();

    res.json({
      message: 'Career removed successfully',
      savedCareers: user.savedCareers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/careers/saved
// @desc    Get user's saved careers
// @access  Private
router.get('/saved', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.savedCareers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
