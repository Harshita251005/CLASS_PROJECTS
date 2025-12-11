const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST /api/skills/submit
// @desc    Save skill assessment
// @access  Private
router.post('/submit', protect, async (req, res) => {
  const { skillRatings, strongSkills, weakSkills, recommendedCareers } = req.body;

  try {
    const user = await User.findById(req.user._id);

    user.skillAssessments.push({
      skillRatings,
      strongSkills,
      weakSkills,
      recommendedCareers,
      completedAt: new Date()
    });

    await user.save();

    res.status(201).json({
      message: 'Skill assessment saved successfully',
      skillAssessment: user.skillAssessments[user.skillAssessments.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/skills/history
// @desc    Get user's skill assessment history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.skillAssessments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
