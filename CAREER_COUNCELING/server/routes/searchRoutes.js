const express = require('express');
const router = express.Router();
const careersData = require('../data/careers');

// @route   GET /api/search
// @desc    Search careers by keyword
// @access  Public (or Private)
router.get('/', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json([]);
  }

  const query = q.toLowerCase().trim();
  const careersList = Object.values(careersData);

  const results = careersList.filter(career => {
    const titleMatch = career.title.toLowerCase().includes(query);
    const categoryMatch = career.category.toLowerCase().includes(query);
    const overviewMatch = career.overview.toLowerCase().includes(query);
    
    // Check skills (array)
    const skillsMatch = career.skills.some(skill => 
      skill.toLowerCase().includes(query)
    );

    return titleMatch || categoryMatch || overviewMatch || skillsMatch;
  });

  res.json(results);
});

module.exports = router;
