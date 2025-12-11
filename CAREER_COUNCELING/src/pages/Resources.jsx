import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaBook, FaVideo, FaMapSigns } from 'react-icons/fa';
import resources from '../data/resources';

const Resources = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('learning');

  useEffect(() => {
    if (location.hash === '#articles') {
      setActiveTab('articles');
    } else if (location.hash === '#videos') {
      setActiveTab('videos');
    } else {
      setActiveTab('learning');
    }
  }, [location]);

  const filterResources = (category) => {
    return {
      ...category,
      items: category.items.filter(item => {
        if (activeTab === 'articles') {
          return item.type === 'Articles' || item.type === 'Books' || item.type === 'Platform'; // Broaden if needed
        } else if (activeTab === 'videos') {
          return item.type === 'YouTube' || item.type === 'Coursera' || item.type === 'Video';
        } else {
          // Learning Paths (Default) - Show everything else or specific types
          return !['Articles', 'Books', 'YouTube'].includes(item.type);
        }
      })
    };
  };

  // Better filtering logic:
  // If "All", show everything.
  // Actually, user wants distinct pages.
  // Let's filter by strictly matching types or fallback to all for "Learning Paths" if it's meant to be the main view.
  // Re-evaluating based on "Add page of 2 and 3".
  
  const filteredCategories = resources.map(category => ({
    ...category,
    items: category.items.filter(item => {
      const type = item.type.toLowerCase();
      if (activeTab === 'articles') {
        return type.includes('article') || type.includes('blog') || type === 'books';
      }
      if (activeTab === 'videos') {
        return type === 'youtube' || type.includes('video') || type === 'coursera'; // Coursera is often video-based
      }
      // Learning Paths (Default)
      return !['article', 'blog', 'books', 'youtube'].includes(type) && !type.includes('video');
    })
  })).filter(cat => cat.items.length > 0);

  const tabs = [
    { id: 'learning', label: 'Learning Paths', icon: FaMapSigns },
    { id: 'articles', label: 'Articles & Blogs', icon: FaBook },
    { id: 'videos', label: 'Video Tutorials', icon: FaVideo },
  ];

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
            Learning Resources 📚
          </motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Curated collection of free and paid resources to help you learn and grow
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.location.hash = tab.id;
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
              }`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resources by Category */}
        <div className="space-y-12">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((resource, resourceIndex) => (
                    <motion.a
                      key={resourceIndex}
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl dark:shadow-slate-900/50 transition-all p-6 block border border-gray-100 dark:border-slate-700"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-4xl">{resource.icon}</span>
                        <FaExternalLinkAlt className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                      <span className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-3 py-1 rounded-full mb-3">
                        {resource.type}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{resource.description}</p>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 dark:text-gray-400">No resources found for this category yet.</p>
              <button 
                onClick={() => setActiveTab('learning')}
                className="mt-4 text-primary hover:underline"
              >
                View Learning Paths
              </button>
            </div>
          )}
        </div>

        {/* Additional Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary to-indigo-600 rounded-xl shadow-lg p-8 text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4">Learning Tips 💡</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Start with beginner-friendly courses and gradually progress</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Practice consistently - dedicate at least 1 hour daily</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Build projects to apply what you learn</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Join communities (Reddit, Discord, LinkedIn) for support</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3">✓</span>
                <span>Don't just watch - take notes and implement</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resources;
