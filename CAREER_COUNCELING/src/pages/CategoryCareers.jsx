import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { careerCategories } from '../data/categories';

const CategoryCareers = () => {
  const { categoryId } = useParams();
  
  // Find the category
  const category = careerCategories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark dark:text-white mb-4">Category Not Found</h1>
          <Link to="/careers" className="text-primary hover:underline">
            ← Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/careers" className="text-primary hover:underline mb-4 inline-block">
            ← Back to All Categories
          </Link>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="text-6xl">{category.icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-dark dark:text-white">{category.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{category.description}</p>
            </div>
          </motion.div>
        </div>

        {/* Careers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.careers && category.careers.map((careerName, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl dark:shadow-slate-900/50 transition-all p-6 border border-gray-100 dark:border-slate-700"
            >
              <h3 className="text-xl font-bold text-dark dark:text-white mb-2">{careerName}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Explore this exciting career opportunity in {category.name.toLowerCase()}
              </p>
              <Link 
                to={`/careers/detail/${careerName.toLowerCase().replace(/[\s/]+/g, '-')}`}
                className="text-primary font-semibold text-sm hover:underline"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {(!category.careers || category.careers.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No careers available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCareers;
