import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Input, { TextArea } from '../components/ui/Input';
import Button from '../components/ui/Button';
import api from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg">
            Have questions or suggestions? We'd love to hear from you. Reach out to us using the form below.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-primary-600 to-primary-700 text-white border-none shadow-xl">
              <CardBody className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Contact Info</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-4 mt-1 text-white flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Our Office</h4>
                      <p className="text-white/90 text-sm leading-relaxed">Help Bridge India,<br />New Delhi, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-4 mt-1 text-white flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Phone</h4>
                      <p className="text-white/90 text-sm">+91 7973115446</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 mr-4 mt-1 text-white flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-white">Email</h4>
                      <p className="text-white/90 text-sm">parasgoyal299@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
                  <div className="flex gap-4">
                    {/* Social Icons placeholders */}
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer transition-colors">
                      <span className="font-bold text-white">FB</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer transition-colors">
                      <span className="font-bold text-white">TW</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 cursor-pointer transition-colors">
                      <span className="font-bold text-white">IG</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardBody className="p-8">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-8">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input 
                        id="name"
                        label="Your Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <Input 
                        id="email"
                        type="email"
                        label="Email Address"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Input 
                      id="subject"
                      label="Subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    
                    <TextArea 
                      id="message"
                      label="Message"
                      placeholder="Write your message here..."
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    
                    <div className="flex justify-end">
                      <Button type="submit" size="lg" icon={Send} isLoading={loading}>
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
