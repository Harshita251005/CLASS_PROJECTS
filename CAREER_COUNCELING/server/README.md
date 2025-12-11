# Career Counseling Platform - Backend

## Overview
Backend API for the Career Counseling Platform built with Node.js, Express, and MongoDB.

## Features
- User authentication (JWT)
- Save quiz results
- Save skill assessments
- Save favorite careers
- Protected API routes

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/career_counseling
JWT_SECRET=your_secret_key_here
PORT=5000
```

## Running the Server

### Development mode (with nodemon):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Quiz
- `POST /api/quiz/submit` - Save quiz results (protected)
- `GET /api/quiz/history` - Get quiz history (protected)

### Skills
- `POST /api/skills/submit` - Save skill assessment (protected)
- `GET /api/skills/history` - Get skill history (protected)

### Careers
- `POST /api/careers/save` - Save career to favorites (protected)
- `DELETE /api/careers/save/:careerId` - Remove saved career (protected)
- `GET /api/careers/saved` - Get saved careers (protected)

## MongoDB Setup

### Local MongoDB:
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/career_counseling`

### MongoDB Atlas (Cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env` with your connection string

## Project Structure
```
server/
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   ├── auth.js            # JWT authentication
│   └── errorHandler.js    # Error handling
├── models/
│   └── User.js            # User model
├── routes/
│   ├── auth.js            # Auth routes
│   ├── quiz.js            # Quiz routes
│   ├── skills.js          # Skills routes
│   └── careers.js         # Careers routes
├── .env                   # Environment variables
├── .env.example           # Example env file
├── package.json           # Dependencies
└── server.js              # Main server file
```

## Testing the API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl

Example registration:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

## Notes
- All protected routes require a valid JWT token in the Authorization header
- Passwords are hashed using bcrypt
- Tokens expire after 30 days
