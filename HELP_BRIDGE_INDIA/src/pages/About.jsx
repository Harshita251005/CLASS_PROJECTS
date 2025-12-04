import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Shield, Award, ArrowRight } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">Our Story</Badge>
          <h1 className="text-4xl font-bold mb-6">Bridging the Gap Between <span className="text-primary-600">Help</span> and <span className="text-primary-600">Hope</span></h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            HelpBridge India is more than just a platform; it's a movement. We are dedicated to connecting compassionate individuals with those in urgent need, creating a seamless ecosystem of support, trust, and community welfare.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-white border-l-4 border-primary-600">
              <CardBody className="p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To empower communities by providing a transparent, efficient, and accessible platform where help requests are met with immediate support. We aim to reduce the response time for emergencies and ensure that no call for help goes unanswered.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-white border-l-4 border-purple-600">
              <CardBody className="p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  A society where empathy drives action. We envision a world where technology serves humanity, bridging socio-economic gaps and fostering a culture of giving, volunteering, and mutual support across India.
                </p>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Trust & Transparency",
                desc: "We verify every help request and NGO partner to ensure your contributions reach genuine beneficiaries."
              },
              {
                icon: Users,
                title: "Community First",
                desc: "We believe in the power of community. Every volunteer and donor is a vital pillar of our ecosystem."
              },
              {
                icon: Award,
                title: "Impact Driven",
                desc: "We focus on tangible results. From feeding the hungry to educating a child, every action counts."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardBody className="p-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Creator Section */}
        <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl overflow-hidden text-white mb-20">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-12">
              <Badge variant="warning" className="mb-6">Meet the Creator</Badge>
              <h2 className="text-3xl font-bold mb-6">Built with Love & Purpose</h2>
              <p className="text-primary-100 text-lg mb-8 leading-relaxed">
                "I created HelpBridge India with a simple belief: that technology should be a force for good. Seeing the gap between those who want to help and those who need it, I wanted to build a bridge—a digital home for kindness."
              </p>
              <div>
                <h4 className="text-xl font-bold">Harshita</h4>
                <p className="text-primary-200">Founder & Lead Developer</p>
              </div>
            </div>
            <div className="h-full min-h-[300px] bg-primary-700/30 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
              <div className="relative z-10 text-center p-8">
                <Heart className="w-24 h-24 text-white/20 mx-auto mb-4" />
                <p className="text-2xl font-heading font-bold">Made with ❤️</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" icon={ArrowRight}>Join Our Community</Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
