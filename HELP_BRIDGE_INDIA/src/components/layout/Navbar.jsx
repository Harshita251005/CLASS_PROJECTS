import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, Users, Building, Calendar, BookOpen, LogOut, User as UserIcon } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {};
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Help Requests', path: '/help-requests', icon: Heart },
    { name: 'Volunteers', path: '/volunteers', icon: Users },
    { name: 'NGOs', path: '/ngos', icon: Building },
    { name: 'Drives', path: '/drives', icon: Calendar },
    { name: 'Blog', path: '/blog', icon: BookOpen },
  ];

  // Don't show navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md py-3">
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white p-2 rounded-lg group-hover:shadow-lg transition-all duration-300">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-bold font-heading text-gray-900">
            Help<span className="text-primary-600">Bridge</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <div className="flex items-center space-x-2">
                {user.profilePhoto ? (
                  <img 
                    src={`http://localhost:5000${user.profilePhoto}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-600"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" icon={LogOut} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 ml-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="container-custom py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.icon && <link.icon className="w-5 h-5" />}
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="px-4 py-2 mb-2">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="w-full text-left px-4 py-3 text-primary-600 hover:bg-primary-50 flex items-center space-x-2 rounded-lg mb-2"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center space-x-2 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <Link to="/login" className="block">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="block">
                    <Button className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
