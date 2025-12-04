const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new event
// @route   POST /api/events
router.post('/', async (req, res) => {
  try {
    const { title, date, time, venue, description, image } = req.body;
    
    const event = new Event({
      title,
      date,
      time,
      venue,
      description,
      image,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an event
// @route   PUT /api/events/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, date, time, venue, description, image } = req.body;
    
    const event = await Event.findById(req.params.id);
    
    if (event) {
      event.title = title || event.title;
      event.date = date || event.date;
      event.time = time || event.time;
      event.venue = venue || event.venue;
      event.description = description || event.description;
      event.image = image || event.image;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (event) {
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Participate in an event
// @route   POST /api/events/:id/participate
router.post('/:id/participate', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      // Logic to add user to participants would go here
      // For now, just return success
      res.json({ message: 'Participation registered' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
