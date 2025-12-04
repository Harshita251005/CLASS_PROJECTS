const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const authRoutes = require('./routes/authRoutes');
const helpRequestRoutes = require('./routes/helpRequestRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const ngoRoutes = require('./routes/ngoRoutes');
const eventRoutes = require('./routes/eventRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const statsRoutes = require('./routes/statsRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/help-requests', helpRequestRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/stats', statsRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Stack:', err.stack);
  res.status(500).json({ 
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
