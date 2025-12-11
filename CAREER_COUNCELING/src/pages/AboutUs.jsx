import { motion } from 'framer-motion';
import { FaUsers, FaLightbulb, FaRocket, FaHandshake } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Empowering Your <span className="text-primary">Career Journey</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are dedicated to bridging the gap between talent and opportunity. Our AI-driven platform helps students and professionals discover their true potential and navigate the complex world of modern careers.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-l-4 border-primary"
          >
            <div className="flex items-center mb-4">
              <FaRocket className="text-3xl text-primary mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To provide accessible, personalized, and data-driven career counseling to everyone. We believe that with the right guidance, anyone can achieve definitive success and job satisfaction.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border-l-4 border-purple-500"
          >
            <div className="flex items-center mb-4">
              <FaLightbulb className="text-3xl text-purple-500 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A world where every individual wakes up excited to go to work. We envision a future where career choices are made with clarity, confidence, and foresight, minimizing career regrets.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Why Choose CareerPath?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 dark:bg-slate-800/50 p-6 rounded-xl text-center">
              <div className="bg-white dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">Advanced algorithms to analyze your skills and match you with the perfect career.</p>
            </div>
            <div className="bg-purple-50 dark:bg-slate-800/50 p-6 rounded-xl text-center">
               <div className="bg-white dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">🗺️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personalized Roadmaps</h3>
              <p className="text-gray-600 dark:text-gray-400">Step-by-step guides tailored to your current level and desired goals.</p>
            </div>
             <div className="bg-pink-50 dark:bg-slate-800/50 p-6 rounded-xl text-center">
               <div className="bg-white dark:bg-slate-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Curated Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">Hand-picked courses, articles, and videos from the best sources on the web.</p>
            </div>
          </div>
        </div>

        {/* Team Section (Optional/Placeholder) */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Meet the Team</h2>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg inline-block max-w-sm w-full mx-auto transform hover:-translate-y-2 transition-transform duration-300">
             <div className="w-32 h-32 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto mb-4 overflow-hidden">
                <FaUsers className="w-full h-full p-6 text-gray-400" />
             </div>
             <h3 className="text-xl font-bold text-gray-900 dark:text-white">Harshita</h3>
             <p className="text-primary font-medium">Founder & Lead Developer</p>
             <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
               Passionate about education technology and helping students find their path.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
