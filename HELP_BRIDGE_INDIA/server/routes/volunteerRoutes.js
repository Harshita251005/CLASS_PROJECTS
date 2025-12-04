const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// @desc    Get all volunteers
// @route   GET /api/volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find({});
    res.json(volunteers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Register a volunteer
// @route   POST /api/volunteers
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), async (req, res) => {
  console.log('Volunteer registration hit');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    let skills = req.body.skills;
    // Handle skills if it's a string (from FormData) or already an object
    if (typeof skills === 'string') {
      try {
        skills = JSON.parse(skills);
      } catch (e) {
        console.error('Error parsing skills:', e);
        skills = [];
      }
    }

    const volunteerData = {
      name: req.body.name,
      skills: skills || [],
      availability: req.body.availability,
      location: req.body.location,
    };

    if (req.file) {
      volunteerData.image = `/uploads/profiles/${req.file.filename}`;
    }

    const newVolunteer = new Volunteer(volunteerData);
    const savedVolunteer = await newVolunteer.save();
    res.status(201).json(savedVolunteer);
  } catch (error) {
    console.error('Volunteer registration error:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
