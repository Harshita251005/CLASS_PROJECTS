const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a new blog
// @route   POST /api/blogs
router.post('/', async (req, res) => {
  try {
    const { title, category, excerpt, content, readTime, image, author } = req.body;
    
    const blog = new Blog({
      title,
      category,
      excerpt,
      content,
      readTime,
      image,
      author: author || 'Admin',
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
router.put('/:id', async (req, res) => {
  try {
    const { title, category, excerpt, content, readTime, image, author } = req.body;
    
    const blog = await Blog.findById(req.params.id);
    
    if (blog) {
      blog.title = title || blog.title;
      blog.category = category || blog.category;
      blog.excerpt = excerpt || blog.excerpt;
      blog.content = content || blog.content;
      blog.readTime = readTime || blog.readTime;
      blog.image = image || blog.image;
      blog.author = author || blog.author;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
