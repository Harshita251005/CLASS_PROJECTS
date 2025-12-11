import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaLightbulb, FaCheckCircle, FaBriefcase, FaGraduationCap, FaAward, FaSearch, FaMagic } from 'react-icons/fa';
import axios from 'axios';

const ResumeTips = () => {
  const resumeTips = [
    'Keep it to 1-2 pages maximum',
    'Use a clean, professional template',
    'Start with a strong summary/objective',
    'List relevant skills prominently',
    'Use action verbs (Developed, Led, Implemented)',
    'Quantify achievements with numbers',
    'Tailor resume for each job application',
    'Include projects and internships',
    'Proofread for grammar and spelling errors',
    'Use ATS-friendly format (avoid complex graphics)'
  ];

  const [searchCareer, setSearchCareer] = useState('');
  const [generatedResume, setGeneratedResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!searchCareer.trim()) return;

    setIsLoading(true);
    setGeneratedResume(null);

    try {
      const response = await axios.post('http://localhost:5000/api/ai/resume-sections', {
        career: searchCareer
      });
      setGeneratedResume(response.data);
    } catch (error) {
      console.error('Error generating resume sections:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const interviewTips = [
    'Research the company thoroughly',
    'Practice common interview questions',
    'Prepare STAR method answers (Situation, Task, Action, Result)',
    'Dress professionally',
    'Arrive 10-15 minutes early',
    'Bring multiple copies of your resume',
    'Prepare questions to ask the interviewer',
    'Follow up with a thank-you email',
    'Be honest about your skills and experience',
    'Show enthusiasm and confidence'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Resume & Portfolio Tips 📄
          </motion.h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Craft the perfect resume and ace your interviews
          </p>
        </div>

        {/* Resume Writing Tips */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <FaFileAlt className="text-primary dark:text-indigo-400 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How to Write a Great Resume</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumeTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Career-Specific Resume Examples */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center flex items-center justify-center gap-3">
              <FaMagic className="text-purple-600 dark:text-purple-400" />
              AI Resume Section Generator
            </h2>
            
            {/* Search Input */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchCareer}
                  onChange={(e) => setSearchCareer(e.target.value)}
                  placeholder="Enter a Job Title (e.g., Digital Marketer, Nurse, Cybersecurity Analyst)"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none text-lg bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !searchCareer.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? 'Generating...' : <><FaSearch /> Generate</>}
                </button>
              </div>
            </div>

            {/* Results Display */}
            <AnimatePresence>
              {generatedResume && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Header */}
                  <div className="text-center border-b border-gray-200 dark:border-slate-700 pb-6">
                    <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{generatedResume.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Optimized Resume Structure & Keywords</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 1. Essential Skills */}
                    <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaCheckCircle className="text-green-500" />
                        1. Essential Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-slate-700 shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 2. Key Projects */}
                    <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaLightbulb className="text-yellow-500" />
                        2. Key Projects / Portfolio
                      </h4>
                      <div className="space-y-3">
                        {generatedResume.projects.map((project, index) => (
                          <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700">
                            <h5 className="font-bold text-gray-800 dark:text-gray-200">{project.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Work Experience */}
                    <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl md:col-span-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaBriefcase className="text-blue-500" />
                        3. Work Experience (Optimized Bullets)
                      </h4>
                      <ul className="space-y-3">
                        {generatedResume.experience.map((exp, index) => (
                          <li key={index} className="flex items-start gap-3 bg-white dark:bg-slate-800 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 4. Education & 5. Certifications */}
                    <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaGraduationCap className="text-indigo-500" />
                        Education & Certifications
                      </h4>
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 underline decoration-indigo-500">4. Education</h5>
                        <p className="text-gray-600 dark:text-gray-400">{generatedResume.education}</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 underline decoration-indigo-500">5. Recommended Certifications</h5>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                          {generatedResume.certifications.map((cert, i) => (
                            <li key={i}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 6. Achievements */}
                    <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FaAward className="text-orange-500" />
                        6. Achievements to Highlight
                      </h4>
                      <ul className="space-y-2">
                        {generatedResume.achievements.map((ach, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <FaAward className="text-orange-400 text-sm" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 7. Keywords & 8. Action Verbs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-600">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">7. ATS Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.keywords.map((kw, i) => (
                          <span key={i} className="px-2 py-1 bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 text-xs font-mono rounded border border-blue-200 dark:border-slate-600">
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 p-6 rounded-xl border border-purple-100 dark:border-slate-600">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">8. Power Action Verbs</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedResume.actionVerbs.map((verb, i) => (
                          <span key={i} className="px-2 py-1 bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 text-xs font-mono rounded border border-purple-200 dark:border-slate-600">
                            {verb}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Portfolio Suggestions */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <FaLightbulb className="text-purple-600 dark:text-purple-400 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Building Tips</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">For Developers</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Create a GitHub profile with pinned projects</li>
                <li>• Build a personal website/portfolio</li>
                <li>• Contribute to open source</li>
                <li>• Write technical blogs</li>
                <li>• Deploy projects with live demos</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">For Designers</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Create Behance/Dribbble portfolio</li>
                <li>• Showcase 5-10 best projects</li>
                <li>• Include case studies</li>
                <li>• Show design process</li>
                <li>• Add client testimonials</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Interview Preparation */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interview Preparation Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <span className="bg-primary dark:bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300 pt-1">{tip}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-primary to-indigo-600 dark:from-indigo-700 dark:to-purple-800 rounded-xl shadow-lg p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="mb-6 opacity-90">
            Check out resume templates and interview prep resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.overleaf.com/gallery/tagged/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary dark:text-indigo-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Resume Templates
            </a>
            <a
              href="https://www.youtube.com/results?search_query=interview+preparation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-800 transition-colors"
            >
              Interview Prep Videos
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeTips;
