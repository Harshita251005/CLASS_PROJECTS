import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import HelpRequests from './pages/HelpRequests';
import Volunteers from './pages/Volunteers';
import NGODirectory from './pages/NGODirectory';
import DonationDrives from './pages/DonationDrives';
import AwarenessBlog from './pages/AwarenessBlog';
import About from './pages/About';
import EmergencyHelplines from './pages/EmergencyHelplines';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { initializeStorage } from './utils/storage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes - Login/Register Only */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes - Authentication Required */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/help-requests" element={<ProtectedRoute><HelpRequests /></ProtectedRoute>} />
            <Route path="/volunteers" element={<ProtectedRoute><Volunteers /></ProtectedRoute>} />
            <Route path="/ngos" element={<ProtectedRoute><NGODirectory /></ProtectedRoute>} />
            <Route path="/drives" element={<ProtectedRoute><DonationDrives /></ProtectedRoute>} />
            <Route path="/blog" element={<ProtectedRoute><AwarenessBlog /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/emergency" element={<ProtectedRoute><EmergencyHelplines /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
