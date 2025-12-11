const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
        ...user.profile,
        // Ensure stats exist even if not in DB yet
        stats: user.profile?.stats || {
          careersExplored: 0,
          quizzesCompleted: 0,
          skillsAnalyzed: 0
        }
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // Update basic user info
      if (req.body.name) user.name = req.body.name;
      // Email updates might require verification, skipping for now or handle carefully
      
      // Update profile fields
      if (!user.profile) user.profile = {};
      
      const profileFields = ['phone', 'location', 'occupation', 'education', 'bio', 'skills', 'interests', 'photo'];
      
      profileFields.forEach(field => {
        if (req.body[field] !== undefined) {
          user.profile[field] = req.body[field];
        }
      });

      // Update stats if provided (direct set)
      if (req.body.stats) {
        user.profile.stats = { ...user.profile.stats, ...req.body.stats };
      }

      // Increment stats if provided
      if (req.body.incrementStats) {
        if (!user.profile.stats) {
          user.profile.stats = { careersExplored: 0, quizzesCompleted: 0, skillsAnalyzed: 0 };
        }
        Object.keys(req.body.incrementStats).forEach(key => {
          // Initialize if undefined
          if (user.profile.stats[key] === undefined) {
             user.profile.stats[key] = 0;
          }
          user.profile.stats[key] += req.body.incrementStats[key];
        });
      }

      const updatedUser = await user.save();

      res.json({
        name: updatedUser.name,
        email: updatedUser.email,
        ...updatedUser.profile
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
