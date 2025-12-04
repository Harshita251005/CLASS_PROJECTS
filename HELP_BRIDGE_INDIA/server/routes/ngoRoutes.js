const express = require('express');
const router = express.Router();
const NGO = require('../models/NGO');
const upload = require('../middleware/uploadMiddleware');

// @desc    Get all NGOs
// @route   GET /api/ngos
router.get('/', async (req, res) => {
  try {
    const ngos = await NGO.find({});
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Register a new NGO
// @route   POST /api/ngos
router.post('/', upload.single('image'), async (req, res) => {
  console.log('NGO registration hit');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    const ngoData = {
      name: req.body.name,
      category: req.body.category,
      address: req.body.address,
      website: req.body.website,
      verified: req.body.verified === 'true' || req.body.verified === true,
    };

    // Handle image - uploaded file, URL from body, or use default
    if (req.file) {
      ngoData.image = `/uploads/profiles/${req.file.filename}`;
    } else {
      // Use default image if no file uploaded
      ngoData.image = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
    }

    console.log('NGO Data to save:', ngoData);

    const newNGO = new NGO(ngoData);
    const savedNGO = await newNGO.save();
    res.status(201).json(savedNGO);
  } catch (error) {
    console.error('NGO registration error:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
