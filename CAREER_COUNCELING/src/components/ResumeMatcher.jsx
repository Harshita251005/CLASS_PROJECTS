import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaCheckCircle, FaTimesCircle, FaSpinner, FaFileAlt, FaTimes } from 'react-icons/fa';

const ResumeMatcher = ({ career }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file) => {
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, TXT, DOC, or DOCX file');
      return;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(file);
    setError('');
    setResults(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setResults(null);
    setError('');
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('careerTitle', career.title);
    formData.append('careerSkills', JSON.stringify(career.skills));

    try {
      const response = await fetch('http://localhost:5000/api/ai/resume-matcher', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        setError(data.msg || 'Failed to analyze resume');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 dark:text-green-400';
    if (percentage >= 60) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (percentage >= 60) return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    if (percentage >= 40) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-xl p-8 mb-8 border-2 border-purple-200 dark:border-slate-700 transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-semibold mr-3">
              PREMIUM
            </span>
            AI Resume Matcher
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Upload your resume to see how well it matches {career.title} requirements</p>
        </div>
      </div>

      {/* Upload Area */}
      {!results && (
        <div className="mb-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              isDragging
                ? 'border-purple-600 dark:border-purple-500 bg-indigo-50 dark:bg-slate-700 scale-105'
                : file
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-purple-600 dark:hover:border-purple-500 hover:bg-indigo-50 dark:hover:bg-slate-700'
            }`}
          >
            {file ? (
              <div className="flex items-center justify-between bg-white dark:bg-slate-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <FaFileAlt className="text-purple-600 dark:text-purple-400 text-3xl mr-4" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2"
                  disabled={isAnalyzing}
                >
                  <FaTimes size={20} />
                </button>
              </div>
            ) : (
              <>
                <FaUpload className="text-purple-600 dark:text-purple-400 text-5xl mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Drop your resume here or click to browse
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Supports PDF, TXT, DOC, DOCX (Max 5MB)
                </p>
                <input
                  type="file"
                  onChange={handleFileInput}
                  accept=".pdf,.txt,.doc,.docx"
                  className="hidden"
                  id="resume-upload"
                  disabled={isAnalyzing}
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-block bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-colors"
                >
                  Choose File
                </label>
              </>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg flex items-center"
            >
              <FaTimesCircle className="mr-2" />
              {error}
            </motion.div>
          )}

          {file && !results && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`px-8 py-4 rounded-lg font-bold text-white text-lg transition-all transform hover:scale-105 ${
                  isAnalyzing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg'
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Analyzing Resume...
                  </span>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </motion.div>
          )}
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Demo Mode Notice */}
            {results.demoMode && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-lg">
                💡 {results.message || 'Demo Mode Active'}
              </div>
            )}

            {/* Match Score */}
            <div className={`border-2 rounded-xl p-6 ${getScoreBgColor(results.matchPercentage)}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Career Match Score</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{results.summary}</p>
                </div>
                <div className="text-center">
                  <div className={`text-6xl font-bold ${getScoreColor(results.matchPercentage)}`}>
                    {results.matchPercentage}%
                  </div>
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
                    {results.careerReadinessScore}
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Match */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  Skills You Have ({results.matchedSkills.length})
                </h3>
                <div className="space-y-2">
                  {results.matchedSkills.length > 0 ? (
                    results.matchedSkills.map((skill, index) => (
                      <div key={index} className="flex items-center text-green-700 dark:text-green-400">
                        <FaCheckCircle className="mr-2 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-green-600 dark:text-green-400">No matching skills found</p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <FaTimesCircle className="mr-2" />
                  Skills to Learn ({results.missingSkills.length})
                </h3>
                <div className="space-y-2">
                  {results.missingSkills.length > 0 ? (
                    results.missingSkills.map((skill, index) => (
                      <div key={index} className="flex items-center text-red-700 dark:text-red-400">
                        <FaTimesCircle className="mr-2 flex-shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-green-600 dark:text-green-400">You have all required skills!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            {results.recommendations && results.recommendations.length > 0 && (
              <div className="bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-slate-600 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📚 Recommendations to Improve</h3>
                <ul className="space-y-3">
                  {results.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-purple-600 dark:bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRemoveFile}
                className="px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Analyze Another Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ResumeMatcher;
