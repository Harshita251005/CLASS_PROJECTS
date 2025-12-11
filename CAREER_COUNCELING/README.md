# 🎯 Career Counseling Platform

A comprehensive **AI-powered career guidance platform** built with React, Node.js, Express, and MongoDB. The platform helps students and professionals discover suitable career paths through interactive quizzes, skill assessments, AI-powered recommendations, and personalized roadmaps.

![Career Counseling Platform](https://img.shields.io/badge/Status-Active-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green)
![Vite](https://img.shields.io/badge/Vite-5.2-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)

---

## 📸 Demo Preview

### Home Page
- Modern hero section with career statistics
- Featured career categories with hover effects
- Call-to-action buttons for quick navigation
- Dark/Light mode toggle

### Career Quiz
- Interactive 15-question assessment
- Progress bar tracking
- AI-powered result analysis
- Personalized career recommendations with match percentages

### Profile Dashboard
- Activity statistics tracking
- Saved careers bookmark system
- Quiz history and results
- Skills and interests management

---

## ✨ Features

### 🔐 Authentication & User Management
- **User Registration & Login** - Secure JWT-based authentication with email/password
- **Password Recovery** - Forgot password functionality with email verification
- **User Profiles** - Customizable profiles with skills, interests, and activity tracking
- **Protected Routes** - Secure access to platform features for authenticated users

### 🎯 Career Exploration
- **Career Categories** - Browse 8+ career categories (Technology, Healthcare, Business, Engineering, Design, Arts, Government, Science)
- **Detailed Career Pages** - In-depth information for 30+ career paths including:
  - Overview and job description
  - Required skills and degrees
  - Career roles and progression
  - Salary information (India & Global)
  - Step-by-step roadmap
  - Pros and cons analysis
  - Future scope and how to start
- **Career Search** - Search and filter careers by keywords
- **Save Careers** - Bookmark favorite careers for later reference

### 📝 Career Quiz
- **Interactive Assessment** - 15 questions covering:
  - Interests and work preferences
  - Personality traits
  - Skills and strengths
  - Learning style
  - Career goals and values
  - Stress management
  - Technology comfort level
- **AI-Powered Analysis** - Get personalized career recommendations based on responses
- **Match Percentages** - See compatibility scores for each recommended career
- **Strengths & Weaknesses** - Identify areas for improvement with detailed roadmaps

### 💡 Skill Assessment
- **Self-Assessment Tool** - Rate your proficiency in various technical and soft skills
- **Skill Gap Analysis** - Compare your skills against career requirements
- **Learning Recommendations** - Get prioritized resources to upskill with priority levels
- **Progress Tracking** - Track skill development over time

### 🗺️ AI Career Roadmap Generator
- **Personalized Roadmaps** - Step-by-step career progression plans with 5-6 phases
- **Course Suggestions** - Curated online courses from top platforms
- **Certification Guides** - Essential certifications with provider, duration, and cost
- **Project Ideas** - Hands-on projects to build your portfolio (Beginner to Advanced)
- **Tool Recommendations** - Essential tools and technologies for each career
- **Internship Guides** - Practical tips for landing internships and jobs

### 🤖 AI-Powered Features
| Feature | Description |
|---------|-------------|
| **AI Career Assistant** | Chat with an AI counselor for personalized career advice |
| **Resume Matcher** | Upload your resume (PDF/TXT/DOC) and get career match analysis |
| **Interview Question Generator** | Practice with 15+ career-specific questions with difficulty levels |
| **Salary Predictor** | Estimate potential earnings based on experience and location |
| **Weekly Study Planner** | AI-generated 7-day study schedules with resources |
| **Course Recommendations** | Curated learning resources from Udemy, Coursera, edX |
| **Resume Section Generator** | AI-powered resume content creation |

> 💡 **Demo Mode**: All AI features work in demo mode with pre-configured responses when OpenAI API is unavailable

### 📚 Resources & Support Pages
- **Learning Resources** - Curated courses, tutorials, and certifications
- **Resume Tips** - AI-generated resume writing guidance
- **Career Articles** - Industry insights and trends
- **About Us** - Platform mission and team information
- **Contact** - Get in touch with support
- **FAQ** - Frequently asked questions
- **Privacy Policy** - Data protection information
- **Terms of Service** - Platform usage terms

### 🌙 User Experience
- **Dark Mode** - Beautiful dark/light theme toggle with system preference detection
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Modern UI** - Tailwind CSS styling with Framer Motion animations
- **Smooth Transitions** - Page transitions and micro-interactions

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2 | UI Framework with Hooks |
| **Vite** | 5.2 | Build Tool & Dev Server |
| **Tailwind CSS** | 3.4 | Utility-first CSS Styling |
| **React Router** | 6.22 | Client-side Routing |
| **Framer Motion** | 11.0 | Animations & Transitions |
| **Axios** | 1.6 | HTTP Requests |
| **Zustand** | 4.5 | Lightweight State Management |
| **React Icons** | 5.1 | Icon Library |
| **React Markdown** | 10.1 | Markdown Rendering |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript Runtime |
| **Express.js** | 4.18 | Web Framework |
| **MongoDB** | 8.0 | NoSQL Database |
| **Mongoose** | 8.0 | MongoDB ODM |
| **JWT** | 9.0 | Authentication Tokens |
| **bcryptjs** | 2.4 | Password Hashing |
| **OpenAI** | 6.9 | AI/GPT Integration |
| **Multer** | 2.0 | File Uploads |
| **pdf-parse** | 1.1 | Resume PDF Parsing |
| **express-validator** | 7.0 | Input Validation |

---

## 📁 Project Structure

```
CAREER_COUNCELING/
├── 📂 src/                          # Frontend source code
│   ├── 📂 components/               # Reusable React components
│   │   ├── Navbar.jsx               # Navigation with search & theme toggle
│   │   ├── Footer.jsx               # Footer with support links
│   │   ├── Chatbot.jsx              # AI chatbot widget
│   │   ├── ProtectedRoute.jsx       # Auth guard component
│   │   ├── ResumeMatcher.jsx        # Resume analysis tool
│   │   ├── SalaryPredictor.jsx      # Salary estimation
│   │   ├── SkillGapAnalyzer.jsx     # Skill comparison tool
│   │   ├── InterviewQuestionGenerator.jsx  # Interview prep
│   │   ├── CourseRecommendations.jsx       # Course finder
│   │   ├── WeeklyStudyPlanner.jsx          # Study schedule
│   │   └── AIRecommendationCard.jsx        # AI result cards
│   ├── 📂 pages/                    # Page components (20 pages)
│   │   ├── Home.jsx                 # Landing page with categories
│   │   ├── CareerCategories.jsx     # Career category browser
│   │   ├── CategoryCareers.jsx      # Careers in category
│   │   ├── CareerDetails.jsx        # Individual career info
│   │   ├── CareerQuiz.jsx           # 15-question assessment
│   │   ├── SkillAssessment.jsx      # Skill evaluation
│   │   ├── Roadmap.jsx              # AI roadmap generator
│   │   ├── AIAssistant.jsx          # AI chat interface
│   │   ├── Resources.jsx            # Learning resources
│   │   ├── ResumeTips.jsx           # Resume guidance
│   │   ├── Profile.jsx              # User dashboard
│   │   ├── Login.jsx                # User login
│   │   ├── Signup.jsx               # User registration
│   │   ├── ForgotPassword.jsx       # Password recovery
│   │   ├── SearchResults.jsx        # Career search
│   │   ├── AboutUs.jsx              # About page
│   │   ├── Contact.jsx              # Contact form
│   │   ├── FAQ.jsx                  # FAQ page
│   │   ├── PrivacyPolicy.jsx        # Privacy info
│   │   └── TermsOfService.jsx       # Terms page
│   ├── 📂 context/                  # React contexts
│   │   ├── AuthContext.jsx          # Authentication state
│   │   └── ThemeContext.jsx         # Dark/Light theme
│   ├── 📂 data/                     # Static data files
│   │   ├── careers.js               # 30+ career definitions
│   │   ├── categories.js            # 8 category definitions
│   │   ├── quizQuestions.js         # 15 quiz questions
│   │   └── resources.js             # Learning resources
│   ├── 📂 utils/                    # Utility functions
│   ├── App.jsx                      # Main app with routing
│   ├── App.css                      # Global styles
│   └── main.jsx                     # React entry point
├── 📂 server/                       # Backend source code
│   ├── 📂 config/
│   │   └── db.js                    # MongoDB connection
│   ├── 📂 controllers/              # Route controllers
│   ├── 📂 middleware/
│   │   ├── auth.js                  # JWT authentication
│   │   └── errorHandler.js          # Error handling
│   ├── 📂 models/
│   │   └── User.js                  # User schema
│   ├── 📂 routes/                   # API routes (7 files)
│   │   ├── auth.js                  # Authentication endpoints
│   │   ├── aiRoutes.js              # AI feature endpoints
│   │   ├── careers.js               # Career data endpoints
│   │   ├── quiz.js                  # Quiz endpoints
│   │   ├── skills.js                # Skills endpoints
│   │   ├── profileRoutes.js         # Profile endpoints
│   │   └── searchRoutes.js          # Search endpoints
│   ├── 📂 utils/
│   │   └── demoResponses.js         # Demo mode fallbacks
│   ├── 📂 uploads/                  # Resume uploads (gitignored)
│   ├── server.js                    # Express app entry
│   ├── package.json                 # Backend dependencies
│   └── .env                         # Environment variables
├── 📂 public/                       # Static assets
├── package.json                     # Frontend dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── eslint.config.js                 # ESLint configuration
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**
- **OpenAI API Key** (optional - demo mode available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CAREER_COUNCELING
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/career_counseling
   JWT_SECRET=your_secure_jwt_secret_key
   OPENAI_API_KEY=your_openai_api_key  # Optional for AI features
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

6. **Start the backend server**
   ```bash
   cd server
   npm start
   # or for development with hot reload
   npm run dev
   ```

7. **Start the frontend development server** (in a new terminal)
   ```bash
   # In the root directory
   npm run dev
   ```

8. **Open in browser**
   ```
   Frontend: http://localhost:5173
   Backend API: http://localhost:5000
   ```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user with email validation |
| POST | `/login` | User login with JWT token |
| GET | `/me` | Get current authenticated user |
| POST | `/reset-password` | Request password reset |

### AI Features (`/api/ai`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat` | AI chatbot conversation with career context |
| POST | `/quiz-analysis` | Analyze quiz responses for career matches |
| POST | `/roadmap-generator` | Generate personalized career roadmap |
| POST | `/skill-gap-analysis` | Analyze skill gaps for target career |
| POST | `/resume-matcher` | Match resume to career (file upload) |
| POST | `/interview-questions` | Generate interview questions |
| POST | `/salary-predictor` | Predict salary based on inputs |
| POST | `/weekly-study-plan` | Generate 7-day study schedule |
| POST | `/course-recommendations` | Get curated course suggestions |
| POST | `/resume-sections` | Generate resume section content |

### Careers (`/api/careers`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all careers |
| GET | `/:id` | Get career by ID |

### Profile (`/api/profile`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get user profile |
| PUT | `/` | Update profile |

### Search (`/api/search`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/?q=query` | Search careers by keyword |

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment mode (development/production) | Yes | - |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | - |
| `OPENAI_API_KEY` | OpenAI API key for AI features | No | Demo mode |

> 💡 **Note**: The platform includes comprehensive demo mode fallbacks when OpenAI API is unavailable. All AI features work with pre-configured intelligent responses.

### Frontend Configuration

The frontend is configured in `vite.config.js` with API proxy to the backend:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
```

---

## 📱 Available Scripts

### Frontend (root directory)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend (server directory)
| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with nodemon (hot reload) |

---

## 🎨 Customization

### Adding New Careers
Edit `src/data/careers.js` to add new career entries:
```javascript
'career-slug': {
  id: 'career-slug',
  title: 'Career Title',
  category: 'Category Name',
  overview: 'Career description...',
  skills: ['Skill 1', 'Skill 2'],
  degrees: ['Degree 1', 'Degree 2'],
  roles: ['Role 1', 'Role 2'],
  salary: { india: '₹X-Y LPA', global: '$X-Y/year' },
  roadmap: [...],
  pros: [...],
  cons: [...],
  futureScope: '...',
  howToStart: [...]
}
```

### Adding Quiz Questions
Edit `src/data/quizQuestions.js` to add new questions:
```javascript
{
  id: 16,
  category: 'Category Name',
  question: 'Your question?',
  options: [
    { text: 'Option 1', careers: ['career-1', 'career-2'], points: 3 },
    // ... more options
  ]
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ESLint rules for code consistency
- Write meaningful commit messages
- Test all new features before submitting PR
- Update documentation for new features

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Ensure MongoDB is running
mongod

# Or check your MONGO_URI in .env for Atlas
```

**Port Already in Use**
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
```

**OpenAI Rate Limit**
- The platform automatically falls back to demo mode
- Demo responses are pre-configured and fully functional

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

Created with ❤️ for helping students and professionals discover their ideal career paths.

**Project**: Career Counseling Platform  
**Version**: 1.0.0  
**Last Updated**: December 2024

---

## 🙏 Acknowledgments

- **OpenAI** - Powering AI features with GPT-3.5 Turbo
- **React Team** - Excellent UI framework
- **Vite Team** - Lightning-fast build tool
- **Tailwind CSS** - Beautiful utility-first styling
- **MongoDB** - Flexible NoSQL database
- **Framer Motion** - Smooth animations library
