import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import careerCategories from '../data/categories';

const CareerCategories = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Explore Career Categories
          </motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose a category that interests you and discover exciting career opportunities
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {careerCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-2xl dark:shadow-slate-900/50 transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 dark:border-slate-700"
            >
              <Link to={`/careers/${category.id}`}>
                <div className={`${category.color} h-2`}></div>
                <div className="p-6">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.careers.slice(0, 2).map((career, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        {career}
                      </span>
                    ))}
                    {category.careers.length > 2 && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        +{category.careers.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerCategories;
