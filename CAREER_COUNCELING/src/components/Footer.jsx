import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary dark:text-white">CareerPath</h3>
            <p className="text-sm leading-relaxed">
              Empowering your future with AI-driven career guidance. Discover your potential, exact roadmap, and the skills you need to succeed.
            </p>
            <div className="flex space-x-4 pt-2">
              <span className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors cursor-default"><FaFacebook size={20} /></span>
              <span className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors cursor-default"><FaTwitter size={20} /></span>
              <span className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors cursor-default"><FaInstagram size={20} /></span>
              <span className="text-gray-500 hover:text-primary dark:hover:text-white transition-colors cursor-default"><FaLinkedin size={20} /></span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/careers" className="hover:text-primary dark:hover:text-white transition-colors">Explore Careers</Link></li>
              <li><Link to="/roadmap" className="hover:text-primary dark:hover:text-white transition-colors">Career Roadmap</Link></li>
              <li><Link to="/resources" className="hover:text-primary dark:hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/quiz" className="hover:text-primary dark:hover:text-white transition-colors">Career Quiz</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary dark:hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary dark:hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary dark:hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary dark:hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/faq" className="hover:text-primary dark:hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-primary dark:text-purple-400" />
                <span>support@careerpath.com</span>
              </p>
              <p className="flex items-center gap-3">
                <FaPhone className="text-primary dark:text-purple-400" />
                <span>+91 7973115446</span>
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary dark:text-purple-400" />
                <span>Mumbai, India</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} CareerPath. Made with <FaHeart className="text-red-500" /> by Harshita.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
