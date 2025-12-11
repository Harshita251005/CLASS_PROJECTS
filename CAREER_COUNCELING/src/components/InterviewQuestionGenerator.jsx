import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLightbulb, FaSpinner, FaChevronDown, FaChevronUp, FaRedo } from 'react-icons/fa';
import axios from 'axios';

const InterviewQuestionGenerator = ({ career }) => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Easy', 'Medium', 'Hard'
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const generateQuestions = async () => {
    setError('');
    setLoading(true);
    setExpandedQuestions(new Set());

    try {
      const response = await axios.post('http://localhost:5000/api/ai/interview-questions', {
        careerTitle: career.title,
        careerCategory: career.category,
        numberOfQuestions: 15
      });

      setQuestions(response.data);
    } catch (err) {
      console.error('Error generating questions:', err);
      setError('Failed to generate questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (questionId) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedQuestions(newExpanded);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', emoji: '🟢', border: 'border-green-300 dark:border-green-800' };
      case 'medium':
        return { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', emoji: '🟡', border: 'border-yellow-300 dark:border-yellow-800' };
      case 'hard':
        return { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', emoji: '🔴', border: 'border-red-300 dark:border-red-800' };
      default:
        return { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-700 dark:text-gray-300', emoji: '⚪', border: 'border-gray-300 dark:border-gray-600' };
    }
  };

  const filteredQuestions = questions?.questions?.filter(q => {
    if (filter === 'All') return true;
    return q.difficulty === filter;
  }) || [];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8 transition-colors duration-200"
    >
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">🎯</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Practice Interview Questions</h2>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Prepare for your interviews with AI-generated questions tailored for {career.title} roles.
      </p>

      {/* Generate Button */}
      {!questions && (
        <button
          onClick={generateQuestions}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Generating Questions...
            </>
          ) : (
            <>
              <FaLightbulb />
              Generate Interview Questions (AI)
            </>
          )}
        </button>
      )}

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

      {/* Questions Display */}
      {questions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Filter and Regenerate */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === level
                      ? 'bg-purple-600 dark:bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <button
              onClick={generateQuestions}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-purple-600 dark:text-purple-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors disabled:opacity-50"
            >
              <FaRedo className={loading ? 'animate-spin' : ''} />
              Generate New
            </button>
          </div>

          {/* Questions Count */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
          </p>

          {/* Questions List */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredQuestions.map ((question, index) => {
                const diffColor = getDifficultyColor(question.difficulty);
                const isExpanded = expandedQuestions.has(question.id);

                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-2 ${diffColor.border} rounded-lg p-5 bg-white dark:bg-slate-700 hover:shadow-md transition-all`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg font-bold text-gray-800 dark:text-white">
                            {question.id}.
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${diffColor.bg} ${diffColor.text}`}>
                            {diffColor.emoji} {question.difficulty.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded-full text-xs font-medium">
                            {question.category}
                          </span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                          {question.question}
                        </p>
                      </div>
                    </div>

                    {/* Show/Hide Hint Button */}
                    <button
                      onClick={() => toggleQuestion(question.id)}
                      className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <FaChevronUp /> Hide Hint
                        </>
                      ) : (
                        <>
                          <FaChevronDown /> Show Hint
                        </>
                      )}
                    </button>

                    {/* Hint Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-600"
                        >
                          <div className="flex items-start gap-2">
                            <FaLightbulb className="text-yellow-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Hint:</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {question.hint}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Tip */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-indigo-200 dark:border-slate-600">
            <p className="text-sm text-indigo-800 dark:text-indigo-300 flex items-start gap-2">
              <span className="text-lg">💡</span>
              <span>
                <strong>Pro Tip:</strong> Practice these questions out loud to build confidence. 
                Try answering without looking at the hints first, then check for key points you might have missed.
              </span>
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default InterviewQuestionGenerator;
