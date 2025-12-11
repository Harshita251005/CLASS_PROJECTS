import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaStar, FaUsers, FaClock, FaExternalLinkAlt, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const CourseRecommendations = ({ career }) => {
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState(null);

  const fetchCourses = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/course-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerTitle: career.title,
          skillLevel
        })
      });

      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformColor = (platform) => {
    if (platform.toLowerCase().includes('udemy')) return 'bg-purple-600';
    if (platform.toLowerCase().includes('coursera')) return 'bg-blue-600';
    if (platform.toLowerCase().includes('edx') || platform.toLowerCase().includes('harvard')) return 'bg-red-600';
    if (platform.toLowerCase().includes('freecodecamp')) return 'bg-green-600';
    return 'bg-gray-600';
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 mb-8 border-2 border-orange-200 dark:border-orange-800 transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-lg text-sm font-semibold mr-3">
              CURATED
            </span>
            AI Course Recommendations
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Discover the best online courses for {career.title}</p>
        </div>
        <FaGraduationCap className="text-6xl text-orange-300" />
      </div>

      {!courses && (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
          {/* Skill Level Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Select Your Skill Level
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setSkillLevel('beginner')}
                className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                  skillLevel === 'beginner'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500'
                }`}
                disabled={isLoading}
              >
                🌱 Beginner
              </button>
              <button
                onClick={() => setSkillLevel('intermediate')}
                className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                  skillLevel === 'intermediate'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500'
                }`}
                disabled={isLoading}
              >
                🚀 Intermediate
              </button>
              <button
                onClick={() => setSkillLevel('advanced')}
                className={`px-6 py-4 rounded-lg font-semibold transition-all ${
                  skillLevel === 'advanced'
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500'
                }`}
                disabled={isLoading}
              >
                ⭐ Advanced
              </button>
            </div>
          </div>

          {/* Get Recommendations Button */}
          <button
            onClick={fetchCourses}
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Finding Best Courses...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FaGraduationCap className="mr-2" />
                Get Course Recommendations
              </span>
            )}
          </button>
        </div>
      )}

      {/* Courses Display */}
      <AnimatePresence>
        {courses && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Summary */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200 dark:border-orange-800">
              <p className="text-gray-700 dark:text-gray-300 font-semibold">{courses.summary}</p>
              {courses.demoMode && (
                <p className="text-sm text-blue-600 mt-2">
                  💡 Demo Mode: Add OpenAI credits for AI-personalized course recommendations
                </p>
              )}
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.courses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-700 rounded-xl border-2 border-gray-200 dark:border-slate-600 hover:border-orange-400 dark:hover:border-orange-500 transition-all shadow-md hover:shadow-xl overflow-hidden"
                >
                  {/* Course Header */}
                  <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 p-4 border-b-2 border-orange-200 dark:border-orange-800">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">by {course.instructor}</p>
                      </div>
                      <span className={`${getPlatformColor(course.platform)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {course.platform}
                      </span>
                    </div>
                  </div>

                  {/* Course Body */}
                  <div className="p-5 space-y-4">
                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <FaStar className="mr-1" />
                        <span className="font-bold">{course.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaUsers className="mr-1" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaClock className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Price & Level */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">{course.price}</span>
                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm font-semibold">
                        {course.level}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{course.description}</p>

                    {/* Skills */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">You'll Learn:</p>
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 dark:bg-slate-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                      <ul className="space-y-1">
                        {course.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                            <FaCheckCircle className="text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* View Course Button */}
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-center font-semibold py-3 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      <span className="flex items-center justify-center">
                        View Course
                        <FaExternalLinkAlt className="ml-2" />
                      </span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* New Search Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCourses(null)}
                className="px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Find More Courses
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CourseRecommendations;
