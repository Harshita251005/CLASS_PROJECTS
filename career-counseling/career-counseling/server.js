// server.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // MongoDB connection

const logger = require("./middleware/logger"); // Custom logger middleware
const errorHandler = require("./middleware/errorHandler"); // Custom error handler
const mainRoutes = require("./routes/mainRoutes"); // Main route handler

dotenv.config(); // Load environment variables from .env file

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS for templating and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));

// Body-parser middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));

// Custom logger middleware
app.use(logger);

// Main routes
app.use("/", mainRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
