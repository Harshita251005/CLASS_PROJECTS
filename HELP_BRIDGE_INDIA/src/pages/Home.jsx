import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Building, ArrowRight, Activity, Shield, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardBody } from '../components/ui/Card';
import api from '../utils/api';

const Home = () => {
  const [statsData, setStatsData] = useState({
    volunteers: 0,
    requestsFulfilled: 0,
    ngos: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/stats');
        setStatsData(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Active Volunteers', value: `${statsData.volunteers}+`, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Help Requests Fulfilled', value: `${statsData.requestsFulfilled}+`, icon: Heart, color: 'text-red-600', bg: 'bg-red-100' },
    { label: 'Verified NGOs', value: `${statsData.ngos}+`, icon: Building, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const features = [
    {
      title: 'Request Help',
      description: 'Post your requirements for medical, education, or food support and get connected with help.',
      icon: Activity,
      link: '/help-requests',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Volunteer',
      description: 'Join our community of changemakers. Use your skills to make a real difference in society.',
      icon: Users,
      link: '/volunteers',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'NGO Directory',
      description: 'Find and connect with verified NGOs working for various social causes in your city.',
      icon: Building,
      link: '/ngos',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Donation Drives',
      description: 'Participate in upcoming blood donation camps, food distribution drives, and more.',
      icon: Heart,
      link: '/drives',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-white -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-50/50 blur-3xl -z-10 rounded-l-full" />
        
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
                Connecting Hearts, Changing Lives
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Bridge the Gap Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Need & Help</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A community-driven platform connecting people who need support with volunteers and NGOs ready to help. Join us in making the world a better place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/help-requests">
                  <Button size="lg" icon={Heart}>
                    Get Help Now
                  </Button>
                </Link>
                <Link to="/volunteers">
                  <Button variant="outline" size="lg" icon={Users}>
                    Join as Volunteer
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Volunteers helping community" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-bold text-lg">Community Support</p>
                    <p className="text-sm opacity-90">Over 500+ lives impacted this month</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg text-green-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Verified NGOs</p>
                    <p className="text-xs text-gray-500">Trusted partners only</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} mr-4`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Make a Difference</h2>
            <p className="text-gray-600 text-lg">
              Our platform provides multiple ways to contribute and seek support. Choose how you want to get involved.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:border-primary-200">
                  <CardBody className="pt-6">
                    <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <div className="flex items-center text-primary-600 font-medium group">
                      Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="bg-primary-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
              <p className="text-primary-100 text-lg mb-8">
                Whether you need help or want to offer it, HelpBridge is your platform. Join thousands of others making a difference today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/volunteers">
                  <Button size="lg" className="bg-white text-primary-900 hover:bg-gray-100 w-full sm:w-auto">
                    Become a Volunteer
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
