const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST /api/quiz/submit
// @desc    Save quiz results
// @access  Private
router.post('/submit', protect, async (req, res) => {
  const { answers, recommendations } = req.body;

  try {
    const user = await User.findById(req.user._id);

    user.quizResults.push({
      answers,
      recommendations,
      completedAt: new Date()
    });

    await user.save();

    res.status(201).json({
      message: 'Quiz results saved successfully',
      quizResult: user.quizResults[user.quizResults.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/quiz/history
// @desc    Get user's quiz history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.quizResults);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
