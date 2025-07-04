// middleware/logger.js
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next(); // Move to next middleware/route
};

module.exports = logger;
