// routes/mainRoutes.js
const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController"); // Importing the controller

// Home route
router.get("/", mainController.getHome);

// Post route for login
router.post("/login", mainController.postLogin);

// Post route for quiz
router.post("/quiz", mainController.postQuiz);

// Post route for appointment
router.post("/appointment", mainController.postAppointment);

module.exports = router;


