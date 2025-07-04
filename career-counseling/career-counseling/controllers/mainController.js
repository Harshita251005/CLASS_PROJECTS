// controllers/mainController.js
const fs = require("fs");
const path = require("path");

// Helper function to read data from a JSON file
const readJSON = (file, callback) => {
  const filePath = path.join(__dirname, `../data/${file}`);
  
  fs.exists(filePath, (exists) => {
    if (!exists) {
      fs.writeFile(filePath, JSON.stringify([]), (err) => {
        if (err) throw err;
        callback([]); 
      });
    } else {
      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));  
      });
    }
  });
};

// Helper function to write data to a JSON file
const writeJSON = (file, data, callback) => {
  const filePath = path.join(__dirname, `../data/${file}`);
  
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    callback();  
  });
};

// Get Home route
exports.getHome = (req, res) => {
  res.render("index");
};

// Post route for Login
exports.postLogin = (req, res) => {
  const { username, password } = req.body;
  
  readJSON("users.json", (users) => {
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      res.status(200).send("Login success");
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
};

// Post route for Quiz results
exports.postQuiz = (req, res) => {
  const answers = Object.values(req.body).map(Number);
  const score = answers.reduce((a, b) => a + b, 0);

  let suggestion = "";
  if (score > 30) suggestion = "Software Developer";
  else if (score > 25) suggestion = "Product Manager";
  else if (score > 20) suggestion = "Counselor";
  else suggestion = "Graphic Designer";

  res.render("quiz-result", { career: suggestion });
};

// Post route for Appointment
exports.postAppointment = (req, res) => {
  const { name, email, date } = req.body;
  
  readJSON("appointments.json", (appointments) => {
    appointments.push({ name, email, date });
    writeJSON("appointments.json", appointments, () => {
      res.render("appointment-success");
    });
  });
};
