import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import careerCategories from '../data/categories';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 pt-4 pb-8 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
              >
                Discover Your Ideal <span className="text-purple-600 dark:text-purple-400">Career Path</span> With Expert Guidance.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg text-gray-600 dark:text-gray-300"
              >
                Take our career quiz, explore detailed roadmaps, and assess your skills to find the perfect profession for you.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <Link to="/careers" className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
                  Explore Careers
                </Link>
                <Link to="/quiz" className="bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 border-2 border-purple-600 dark:border-purple-400 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors">
                  Take Career Quiz
                </Link>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full"
              >
                <img 
                  src="/career_hero_image.png" 
                  alt="Career Path Illustration" 
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Categories Preview */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Career Categories</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Choose from 12+ diverse career fields</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {careerCategories.slice(0, 8).map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <Link to={`/careers`} className="block bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-lg dark:shadow-slate-900/50 transition-all text-center border border-gray-100 dark:border-slate-700">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/careers" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">
              View All Categories →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose CareerPath?</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Everything you need to plan your future.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Career Quiz', desc: 'Find your passion with our interest-based quiz.', icon: '🎯', link: '/quiz' },
              { title: 'Detailed Roadmaps', desc: 'Step-by-step guides to reach your dream job.', icon: '🗺️', link: '/roadmap' },
              { title: 'Skill Assessment', desc: 'Evaluate your skills and get course recommendations.', icon: '📊', link: '/skills' },
            ].map((feature, index) => (
              <Link key={index} to={feature.link}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl shadow-md hover:shadow-lg dark:shadow-slate-900/50 transition-all cursor-pointer border border-gray-100 dark:border-slate-700"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
