import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import careersData from '../data/careers';
import axios from 'axios';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Chatbot from '../components/Chatbot';
import SkillGapAnalyzer from '../components/SkillGapAnalyzer';
import InterviewQuestionGenerator from '../components/InterviewQuestionGenerator';
import ResumeMatcher from '../components/ResumeMatcher';
import WeeklyStudyPlanner from '../components/WeeklyStudyPlanner';
import CourseRecommendations from '../components/CourseRecommendations';
import SalaryPredictor from '../components/SalaryPredictor';

const CareerDetails = () => {
  const { careerId } = useParams();
  const career = careersData[careerId];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Increment careersExplored stat
    const updateStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.put('http://localhost:5000/api/profile', {
            incrementStats: { careersExplored: 1 }
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (error) {
        console.error('Error updating stats:', error);
      }
    };
    
    updateStats();
  }, [careerId]);

  if (!career) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Career Not Found</h1>
          <Link to="/careers" className="text-primary hover:underline">
            ← Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back Button */}
        <Link 
          to="/careers" 
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-6 font-medium transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Categories
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <span className="text-sm text-purple-600 dark:text-purple-400 font-semibold">{career.category}</span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{career.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{career.overview}</p>
        </motion.div>

        {/* Required Skills */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Required Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {career.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{skill}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* AI Skill Gap Analyzer */}
        <SkillGapAnalyzer career={career} />

        {/* AI Interview Question Generator */}
        <InterviewQuestionGenerator career={career} />

        {/* AI Resume Matcher */}
        <ResumeMatcher career={career} />

        {/* AI Weekly Study Planner */}
        <WeeklyStudyPlanner career={career} />

        {/* AI Course Recommendations */}
        <CourseRecommendations career={career} />

        {/* AI Salary Predictor */}
        <SalaryPredictor career={career} />

        {/* Degrees & Certifications */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recommended Degrees & Certifications</h2>
          <ul className="space-y-2">
            {career.degrees.map((degree, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
                <span className="text-gray-700 dark:text-gray-300">{degree}</span>
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Job Roles */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Job Roles Available</h2>
          <div className="flex flex-wrap gap-3">
            {career.roles.map((role, index) => (
              <span 
                key={index}
                className="bg-indigo-50 dark:bg-indigo-900/30 text-purple-600 dark:text-purple-300 px-4 py-2 rounded-full font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Salary Range */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Salary Range</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">India</h3>
              <p className="text-2xl font-bold text-green-600">{career.salary.india}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Global</h3>
              <p className="text-2xl font-bold text-blue-600">{career.salary.global}</p>
            </div>
          </div>
        </motion.section>

        {/* Career Roadmap */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Career Roadmap</h2>
          <div className="space-y-6">
            {career.roadmap.map((stage, index) => (
              <div key={index} className="relative pl-8 pb-8 border-l-2 border-purple-600 dark:border-purple-500 last:border-0">
                <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-600 dark:bg-purple-500 rounded-full"></div>
                <div className="bg-indigo-50 dark:bg-slate-700/50 p-6 rounded-lg">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-1">{stage.stage}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{stage.title}</h3>
                  <ul className="space-y-2">
                    {stage.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-600 dark:text-purple-400 mr-2">→</span>
                        <span className="text-gray-700 dark:text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Pros & Cons */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                <FaCheckCircle className="mr-2" /> Pros
              </h3>
              <ul className="space-y-2">
                {career.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center">
                <FaTimesCircle className="mr-2" /> Cons
              </h3>
              <ul className="space-y-2">
                {career.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span className="text-gray-700 dark:text-gray-300">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Future Scope */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Future Scope</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{career.futureScope}</p>
        </motion.section>

        {/* How to Get Started */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">How to Get Started</h2>
          <ol className="space-y-3">
            {career.howToStart.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </motion.section>
      </div>

      {/* AI Career Mentor Chatbot */}
      <Chatbot career={career} />
    </div>
  );
};

export default CareerDetails;
