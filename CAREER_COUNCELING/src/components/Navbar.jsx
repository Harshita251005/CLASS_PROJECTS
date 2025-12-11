import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaSignOutAlt, FaBars, FaTimes, FaSearch, FaChevronDown, 
  FaRobot, FaSun, FaMoon, FaGraduationCap, FaBook, FaVideo, FaLightbulb, 
  FaChartLine, FaClipboardCheck, FaMapSigns 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { careerCategories } from '../data/categories';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSearch = (e) => {
    if (e && e.key && e.key !== 'Enter') return;
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsMobileMenuOpen(false);
      setSearchTerm('');
    }
  };

  // Navigation Data
  const resourcesLinks = [
    { name: 'Learning Paths', path: '/resources#learning', icon: FaMapSigns, desc: 'Structured guides' },
    { name: 'Articles & Blogs', path: '/resources#articles', icon: FaBook, desc: 'Industry insights' },
    { name: 'Video Tutorials', path: '/resources#videos', icon: FaVideo, desc: 'Expert sessions' },
  ];

  const mainLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Careers', 
      path: '/careers',
      dropdown: true,
      type: 'grid' // Special grid layout for categories
    },
    { name: 'Quiz', path: '/quiz', icon: FaClipboardCheck },
    { name: 'Skills', path: '/skills', icon: FaChartLine },
    { name: 'Roadmap', path: '/roadmap', icon: FaMapSigns },
    { 
      name: 'Resources', 
      path: '/resources',
      dropdown: true,
      items: resourcesLinks
    },
    { name: 'Resume Tips', path: '/resume-tips', icon: FaLightbulb }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-white dark:bg-slate-900 py-4 border-b border-gray-100 dark:border-slate-800'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-purple-500/30">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600 dark:from-purple-400 dark:to-blue-400 tracking-tight">
              CareerPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-1" ref={dropdownRef}>
            {mainLinks.map((link) => (
              <div key={link.name} className="relative group px-1">
                {link.dropdown ? (
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.name}</span>
                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.icon && <link.icon className="text-xs opacity-70" />}
                    {link.name}
                  </Link>
                )}

                {/* Dropdowns */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-0 mt-3 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden ${
                        link.type === 'grid' ? 'w-[600px] -left-12' : 'w-72'
                      }`}
                    >
                      {link.type === 'grid' ? (
                        <div className="p-6">
                           <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-slate-700 pb-2">
                              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Explore Capabilities</h3>
                              <Link to="/careers" onClick={() => setActiveDropdown(null)} className="text-xs text-purple-600 font-semibold hover:underline">View All →</Link>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              {careerCategories.slice(0, 8).map(cat => (
                                <Link
                                  key={cat.id}
                                  to={`/careers/${cat.id}`}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors group/item"
                                >
                                  <span className="text-2xl group-hover/item:scale-110 transition-transform">{cat.icon}</span>
                                  <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">{cat.name}</p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{cat.description}</p>
                                  </div>
                                </Link>
                              ))}
                           </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          {link.items.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all group/item"
                            >
                              <div className="p-2 rounded-lg bg-purple-100 dark:bg-slate-600 text-purple-600 dark:text-purple-300 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors">
                                <item.icon className="text-sm" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors">{item.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Search */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Search careers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border-none rounded-full text-sm text-gray-700 dark:text-gray-200 w-48 focus:w-64 transition-all duration-300 focus:ring-2 focus:ring-purple-500/50"
              />
              <button onClick={() => handleSearch({})} className="absolute left-3.5 top-3 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                <FaSearch />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all hover:rotate-12"
            >
              {theme === 'dark' ? <FaSun className="text-yellow-400 text-lg" /> : <FaMoon className="text-indigo-600 text-lg" />}
            </button>

            {/* AI Assistant */}
            <Link
              to="/ai-assistant"
              className="relative overflow-hidden group px-6 py-2.5 rounded-full font-bold text-sm text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all"></span>
              <div className="relative flex items-center gap-2">
                <FaRobot className="animate-pulse" />
                <span>AI Assistant</span>
              </div>
            </Link>

            {/* Auth Buttons */}
            {user ? (
              <div className="relative group" onClick={() => toggleDropdown('profile')}>
                <button className="flex items-center gap-2 pl-3 pr-1 py-1 rounded-full border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user.name?.split(' ')[0] || 'User'}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                    <FaUser className="text-xs" />
                  </div>
                </button>
                {/* Profile Dropdown */}
                 <div className="absolute right-0 top-full mt-3 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                      <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-slate-700 hover:text-purple-600">
                      <FaUser /> Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <FaSignOutAlt /> Logout
                    </button>
                 </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-full font-bold text-sm text-gray-700 dark:text-white border-2 border-gray-200 dark:border-slate-700 hover:border-purple-600 hover:text-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 h-screen overflow-y-auto pb-24">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <FaSearch className="absolute left-3.5 top-3.5 text-gray-400" />
              </div>

              {mainLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors ${
                          activeDropdown === link.name ? 'bg-purple-50 dark:bg-slate-800 text-purple-700' : 'text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        <span className="font-semibold">{link.name}</span>
                        <FaChevronDown className={`text-xs transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-2"
                          >
                            {link.type === 'grid' ? (
                               <div className="grid grid-cols-1 gap-2">
                                  {careerCategories.slice(0, 6).map(cat => (
                                    <Link key={cat.id} to={`/careers/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                                      <span className="text-xl">{cat.icon}</span>
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                                    </Link>
                                  ))}
                                  <Link to="/careers" className="text-center text-sm text-purple-600 font-bold py-2">View All Categories</Link>
                               </div>
                            ) : (
                               link.items.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-400"
                                >
                                  <item.icon className="text-xs" />
                                  <span className="text-sm font-medium">{item.name}</span>
                                </Link>
                              ))
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block p-3 rounded-xl font-semibold transition-colors ${
                        isActive(link.path) 
                          ? 'bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-400' 
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                         {link.icon && <link.icon />}
                         {link.name}
                      </span>
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-6 border-t border-gray-100 dark:border-slate-800 space-y-4">
                <Link
                  to="/ai-assistant"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-bold shadow-lg"
                >
                  <FaRobot />
                  <span>AI Assistant</span>
                </Link>

                <div className="flex justify-between items-center px-2">
                   <p className="text-sm font-medium text-gray-500">Appearance</p>
                   <button
                    onClick={toggleTheme}
                    className="p-2 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center gap-2"
                  >
                    {theme === 'dark' ? <><FaSun className="text-yellow-400" /> <span className="text-xs">Light Mode</span></> : <><FaMoon className="text-indigo-600" /> <span className="text-xs">Dark Mode</span></>}
                  </button>
                </div>

                {user ? (
                   <div className="space-y-3">
                      <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                         <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                           <FaUser />
                         </div>
                         <div>
                            <p className="font-bold text-gray-800 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-500">View Profile</p>
                         </div>
                      </Link>
                      <button onClick={handleLogout} className="w-full py-3 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50">Log Out</button>
                   </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white px-4 py-3 rounded-xl font-bold hover:bg-gray-200"
                  >
                    Log In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
