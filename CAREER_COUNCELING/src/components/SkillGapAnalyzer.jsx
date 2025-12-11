import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaRocket, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const SkillGapAnalyzer = ({ career }) => {
  const [manualInput, setManualInput] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputMode, setInputMode] = useState('tags'); // 'tags' or 'manual'
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate skill tags from career skills
  const skillTags = career.skills || [];

  // Common additional skills
  const commonSkills = [
    'Python', 'JavaScript', 'Java', 'C++', 'HTML', 'CSS', 'React', 
    'Node.js', 'Git', 'SQL', 'MongoDB', 'AWS', 'Docker', 'TypeScript',
    'Angular', 'Vue.js', 'Django', 'Flask', 'Express', 'REST API'
  ];

  // Merge and deduplicate skills
  const allSuggestedSkills = [...new Set([...skillTags.map(s => s.split('(')[0].trim()), ...commonSkills])];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAnalyze = async () => {
    setError('');
    setAnalysis(null);

    // Get user skills based on input mode
    let userSkills = [];
    if (inputMode === 'manual') {
      userSkills = manualInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    } else {
      userSkills = selectedSkills;
    }

    if (userSkills.length === 0) {
      setError('Please enter or select at least one skill');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/ai/skill-gap-analysis', {
        careerTitle: career.title,
        careerSkills: career.skills,
        userSkills: userSkills
      });

      setAnalysis(response.data);

      // Increment skillsAnalyzed stat
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.put('http://localhost:5000/api/profile', {
            incrementStats: { skillsAnalyzed: 1 }
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (statError) {
        console.error('Error updating stats:', statError);
      }
    } catch (err) {
      console.error('Error analyzing skills:', err);
      setError('Failed to analyze skills. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
    >
      <div className="flex items-center mb-4">
        <FaRocket className="text-3xl text-primary mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check Your Skill Readiness</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Are you ready for this career? Let AI analyze your skills and show you exactly what you need to learn.
      </p>

      {/* Input Mode Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setInputMode('tags')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            inputMode === 'tags'
              ? 'bg-purple-600 dark:bg-purple-500 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
          }`}
        >
          Select Skills
        </button>
        <button
          onClick={() => setInputMode('manual')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            inputMode === 'manual'
              ? 'bg-purple-600 dark:bg-purple-500 text-white'
              : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
          }`}
        >
          Type Manually
        </button>
      </div>

      {/* Input Area */}
      {inputMode === 'manual' ? (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter your skills (comma-separated):
          </label>
          <input
            type="text"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            placeholder="e.g., Python, HTML, CSS, JavaScript"
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          />
        </div>
      ) : (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select your current skills:
          </label>
          <div className="flex flex-wrap gap-2">
            {allSuggestedSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSkills.includes(skill)
                    ? 'bg-purple-600 dark:bg-purple-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          {selectedSkills.length > 0 && (
            <p className="text-sm text-gray-600 mt-3">
              Selected: <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedSkills.join(', ')}</span>
            </p>
          )}
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <FaRocket />
            Analyze My Skills
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300"
        >
          {error}
        </motion.div>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 space-y-6"
          >
            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600"></div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Analysis Results</span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-slate-600"></div>
            </div>

            {/* Skills You Have */}
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm transition-colors duration-200">
              <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
                <FaCheckCircle className="mr-2" />
                ✅ Skills You Have ({analysis.matchedSkills?.length || 0}/{career.skills?.length || 0})
              </h3>
              {analysis.matchedSkills && analysis.matchedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No matching skills found. Start learning the basics!</p>
              )}
            </div>

            {/* Missing Skills */}
            <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm transition-colors duration-200">
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
                <FaTimesCircle className="mr-2" />
                ❌ Missing Skills ({analysis.missingSkills?.length || 0})
              </h3>
              {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.missingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium"
                    >
                      ✗ {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Great! You have all the essential skills!</p>
              )}
            </div>

            {/* Learning Recommendations */}
            {analysis.learningRecommendations && analysis.learningRecommendations.length > 0 && (
              <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-sm transition-colors duration-200">
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">
                  📌 Your Personalized Learning Roadmap
                </h3>
                <div className="space-y-4">
                  {analysis.learningRecommendations.map((rec, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-l-4 border-purple-600 dark:border-purple-500 pl-4 py-2"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{idx + 1}. {rec.skill}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{rec.reason}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Resources:</span>
                        {rec.resources?.map((resource, ridx) => (
                          <span
                            key={ridx}
                            className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {analysis.summary && (
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 text-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold mb-2">📊 Summary</h3>
                <p className="text-sm leading-relaxed">{analysis.summary}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default SkillGapAnalyzer;
