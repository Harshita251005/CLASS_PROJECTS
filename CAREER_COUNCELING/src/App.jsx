import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import CareerCategories from './pages/CareerCategories';
import CategoryCareers from './pages/CategoryCareers';
import CareerDetails from './pages/CareerDetails';
import CareerQuiz from './pages/CareerQuiz';
import SkillAssessment from './pages/SkillAssessment';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import ResumeTips from './pages/ResumeTips';
import SearchResults from './pages/SearchResults';
import AIAssistant from './pages/AIAssistant';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FAQ from './pages/FAQ';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
            <Navbar />
            <main className="flex-grow pt-24">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Support Routes (Public) */}
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/faq" element={<FAQ />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/careers" element={<ProtectedRoute><CareerCategories /></ProtectedRoute>} />
                <Route path="/careers/:categoryId" element={<ProtectedRoute><CategoryCareers /></ProtectedRoute>} />
                <Route path="/careers/detail/:careerId" element={<ProtectedRoute><CareerDetails /></ProtectedRoute>} />
                <Route path="/quiz" element={<ProtectedRoute><CareerQuiz /></ProtectedRoute>} />
                <Route path="/skills" element={<ProtectedRoute><SkillAssessment /></ProtectedRoute>} />
                <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
                <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
                <Route path="/resume-tips" element={<ProtectedRoute><ResumeTips /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
                <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}


export default App;
