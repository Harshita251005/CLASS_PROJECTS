// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).send("Something went wrong!"); // Generic error response
};
