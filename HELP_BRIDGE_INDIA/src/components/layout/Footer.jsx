import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-bold font-heading text-white">
                Help<span className="text-primary-400">Bridge</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting compassionate hearts with those in need. Together, we can build a stronger, more supportive community for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
              <li><Link to="/volunteers" className="hover:text-primary-400 transition-colors">Join as Volunteer</Link></li>
              <li><Link to="/ngos" className="hover:text-primary-400 transition-colors">Partner NGOs</Link></li>
              <li><Link to="/drives" className="hover:text-primary-400 transition-colors">Donation Drives</Link></li>
              <li><Link to="/blog" className="hover:text-primary-400 transition-colors">Awareness Blog</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><Link to="/help-requests?category=Medical" className="hover:text-primary-400 transition-colors">Medical Support</Link></li>
              <li><Link to="/help-requests?category=Education" className="hover:text-primary-400 transition-colors">Education Help</Link></li>
              <li><Link to="/help-requests?category=Food" className="hover:text-primary-400 transition-colors">Food Donation</Link></li>
              <li><Link to="/help-requests?category=OldAge" className="hover:text-primary-400 transition-colors">Senior Citizen Care</Link></li>
              <li><Link to="/emergency" className="hover:text-primary-400 transition-colors">Emergency Helplines</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span>Help Bridge India, New Delhi, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span>+91 7973115446</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span>parasgoyal299@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HelpBridge India. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1 text-primary-400">
            Made with <Heart className="w-4 h-4 fill-current text-red-500" /> by Harshita
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
