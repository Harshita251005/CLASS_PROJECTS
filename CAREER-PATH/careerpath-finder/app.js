const express = require("express");
const path = require("path");

const app = express();

// Set view engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const homeRoutes = require("./routes/home");
app.use("/", homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
