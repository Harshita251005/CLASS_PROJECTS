const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/careers', require('./routes/careers'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Career Counseling API is running' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
