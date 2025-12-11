import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRoad, FaGraduationCap, FaCertificate, FaBriefcase, FaCode, FaTools, FaBrain, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import careersData from '../data/careers';

const Roadmap = () => {
  const [selectedCareer, setSelectedCareer] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Get list of all careers for dropdown
  const careerOptions = Object.values(careersData).map(career => ({
    id: career.id,
    title: career.title
  }));

  const generateRoadmap = async () => {
    if (!selectedCareer) return;

    setIsGenerating(true);
    const career = careersData[selectedCareer];

    try {
      const response = await axios.post('http://localhost:5000/api/ai/roadmap-generator', {
        careerTitle: career.title,
        careerOverview: career.overview
      });

      setRoadmapData(response.data);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      // Error handling is done in backend with demo mode fallback
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FaRoad className="text-6xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-dark dark:text-white mb-4">AI Career Roadmap Generator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select any career and get a comprehensive, AI-generated roadmap with courses, certifications, projects, and more!
          </p>
        </motion.div>

        {/* Career Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-slate-700"
        >
          <label className="block text-lg font-semibold text-dark dark:text-white mb-3">
            Choose Your Dream Career
          </label>
          <div className="flex gap-4">
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
            >
              <option value="">-- Select a Career --</option>
              {careerOptions.map((career) => (
                <option key={career.id} value={career.id}>
                  {career.title}
                </option>
              ))}
            </select>
            <button
              onClick={generateRoadmap}
              disabled={!selectedCareer || isGenerating}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FaBrain />
                  Generate Roadmap
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <FaBrain className="text-primary text-6xl mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Creating Your Personalized Roadmap...</h2>
              <p className="text-gray-600 dark:text-gray-400">AI is analyzing the best path for your career journey</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generated Roadmap */}
        <AnimatePresence>
          {roadmapData && !isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {/* Overview */}
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Your Path to Becoming a {roadmapData.careerTitle}
                </h2>
                <p className="text-lg leading-relaxed">{roadmapData.overview}</p>
              </div>

              {/* Step-by-Step Roadmap */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-6 flex items-center gap-3">
                  <FaRoad className="text-primary" />
                  Step-by-Step Roadmap
                </h3>
                <div className="space-y-6">
                  {roadmapData.steps.map((step, index) => (
                    <div key={index} className="relative pl-8 pb-6 border-l-2 border-primary last:border-0">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="bg-indigo-50 dark:bg-slate-700/50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-bold text-dark dark:text-white">{step.title}</h4>
                          <span className="text-sm text-primary bg-white dark:bg-slate-800 px-3 py-1 rounded-full font-semibold">
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{step.description}</p>
                        <ul className="space-y-2">
                          {step.actions.map((action, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <span className="text-primary mt-1">→</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Online Courses */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-6 flex items-center gap-3">
                  <FaGraduationCap className="text-primary" />
                  Recommended Online Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmapData.courses.map((course, index) => (
                    <div key={index} className="border-2 border-indigo-100 dark:border-slate-700 rounded-lg p-4 hover:border-primary transition-colors">
                      <h4 className="font-bold text-dark dark:text-white mb-2">{course.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{course.platform}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">{course.level}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-6 flex items-center gap-3">
                  <FaCertificate className="text-primary" />
                  Essential Certifications
                </h3>
                <div className="space-y-4">
                  {roadmapData.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <FaCertificate className="text-green-600 dark:text-green-400 text-2xl mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-bold text-dark dark:text-white mb-1">{cert.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{cert.provider}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>⏱️ {cert.duration}</span>
                          <span>💰 {cert.cost}</span>
                          <span className={`px-2 py-1 rounded ${
                            cert.priority === 'High' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                            cert.priority === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {cert.priority} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects to Build */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-6 flex items-center gap-3">
                  <FaCode className="text-primary" />
                  Projects to Build
                </h3>
                <div className="space-y-4">
                  {roadmapData.projects.map((project, index) => (
                    <div key={index} className="border-l-4 border-primary pl-6 py-4 bg-gray-50 dark:bg-slate-700/30 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-dark dark:text-white">{project.title}</h4>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          project.difficulty === 'Beginner' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                          project.difficulty === 'Intermediate' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Skills */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-6 flex items-center gap-3">
                  <FaTools className="text-primary" />
                  Tools & Technologies to Master
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {roadmapData.tools.map((tool, index) => (
                    <div key={index} className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
                      <div className="text-2xl mb-2">{tool.icon}</div>
                      <h4 className="font-bold text-dark dark:text-white text-sm">{tool.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{tool.category}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Internship Guide */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-dark dark:text-white mb-6 flex items-center gap-3">
                  <FaBriefcase className="text-primary" />
                  Internship & Job Search Strategy
                </h3>
                <div className="space-y-4">
                  {roadmapData.internshipGuide.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                      <span className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-dark dark:text-white mb-1">{tip.title}</h4>
                        <p className="text-gray-700 dark:text-gray-300">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Roadmap;
