import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaSpinner, FaCheckCircle, FaBook, FaExternalLinkAlt, FaClock, FaCalendarWeek } from 'react-icons/fa';

const WeeklyStudyPlanner = ({ career }) => {
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studyPlan, setStudyPlan] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [expandedDays, setExpandedDays] = useState({});

  const generatePlan = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/weekly-study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerTitle: career.title,
          careerSkills: career.skills,
          skillLevel,
          hoursPerDay
        })
      });

      const data = await response.json();
      setStudyPlan(data);
      setCompletedTasks({});
      // Expand first day by default
      setExpandedDays({ 0: true });
    } catch (error) {
      console.error('Error generating study plan:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleDay = (dayIndex) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayIndex]: !prev[dayIndex]
    }));
  };

  const toggleTask = (dayIndex, taskIndex) => {
    const key = `${dayIndex}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getDayColor = (dayNumber) => {
    const colors = [
      'from-yellow-100 to-yellow-200 border-yellow-300',
      'from-blue-100 to-blue-200 border-blue-300',
      'from-green-100 to-green-200 border-green-300',
      'from-pink-100 to-pink-200 border-pink-300',
      'from-indigo-100 to-indigo-200 border-indigo-300',
      'from-orange-100 to-orange-200 border-orange-300',
      'from-purple-100 to-purple-200 border-purple-300'
    ];
    return colors[dayNumber - 1] || colors[0];
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 rounded-xl shadow-2xl p-8 mb-8 text-white transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold flex items-center">
            <span className="bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-lg text-sm font-semibold mr-3 animate-pulse">
              AI POWERED
            </span>
            Weekly Study Planner
          </h2>
          <p className="text-purple-100 dark:text-gray-300 mt-2">Get a personalized 7-day learning roadmap for {career.title}</p>
        </div>
        <FaRocket className="text-6xl text-purple-200 opacity-50" />
      </div>

      {!studyPlan && (
        <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Skill Level */}
            <div>
              <label className="block text-sm font-semibold mb-2">Your Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 dark:bg-black/20 border border-white/30 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer"
                disabled={isGenerating}
              >
                <option value="beginner" className="text-gray-900 dark:text-white dark:bg-slate-800">🌱 Beginner - Just Starting Out</option>
                <option value="intermediate" className="text-gray-900 dark:text-white dark:bg-slate-800">🚀 Intermediate - Have Some Knowledge</option>
                <option value="advanced" className="text-gray-900 dark:text-white dark:bg-slate-800">⭐ Advanced - Looking to Master</option>
              </select>
            </div>

            {/* Hours Per Day */}
            <div>
              <label className="block text-sm font-semibold mb-2">Study Hours Per Day</label>
              <input
                type="number"
                min="1"
                max="8"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Math.max(1, Math.min(8, parseInt(e.target.value) || 3)))}
                className="w-full px-4 py-3 rounded-lg bg-white/20 dark:bg-black/20 border border-white/30 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={isGenerating}
              />
              <p className="text-xs text-purple-100 dark:text-gray-300 mt-1">Recommended: 2-4 hours for best results</p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePlan}
            disabled={isGenerating}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform ${
              isGenerating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-slate-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Generating Your Personalized Plan...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FaRocket className="mr-2" />
                Generate My Weekly Study Plan
              </span>
            )}
          </button>
        </div>
      )}

      {/* Study Plan Display */}
      <AnimatePresence>
        {studyPlan && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-4"
          >
            {/* Summary Header */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Your Personalized {skillLevel} Level Plan</h3>
                  <p className="text-purple-100 dark:text-gray-300">{studyPlan.summary}</p>
                </div>
                <div className="flex items-center gap-6 text-center">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <FaCalendarWeek className="text-2xl mx-auto mb-1" />
                    <p className="text-sm font-semibold">7 Days</p>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <FaClock className="text-2xl mx-auto mb-1" />
                    <p className="text-sm font-semibold">{studyPlan.totalHours} Hours</p>
                  </div>
                </div>
              </div>
              
              {studyPlan.demoMode && (
                <div className="mt-4 bg-blue-400/30 border border-blue-300/50 rounded-lg px-4 py-2 text-sm">
                  💡 Demo Mode: Add OpenAI credits for AI-personalized study plans
                </div>
              )}
            </div>

            {/* Day Cards */}
            <div className="space-y-3">
              {studyPlan.weeklyPlan.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dayIndex * 0.1 }}
                  className={`bg-gradient-to-r ${getDayColor(day.dayNumber)} dark:from-slate-700 dark:to-slate-800 dark:border-slate-600 rounded-xl border-2 overflow-hidden shadow-lg`}
                >
                  {/* Day Header */}
                  <div
                    onClick={() => toggleDay(dayIndex)}
                    className="p-5 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-white dark:bg-slate-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-gray-700 dark:text-white mr-4">
                          {day.dayNumber}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 dark:text-white text-lg">{day.day}</h4>
                          <p className="text-gray-700 dark:text-gray-300 font-semibold">{day.topic}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Study Time</p>
                          <p className="font-bold text-gray-800 dark:text-white">{day.hours} hours</p>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedDays[dayIndex] ? 180 : 0 }}
                          className="text-gray-700 dark:text-gray-300 text-2xl"
                        >
                          ▼
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Day Content */}
                  <AnimatePresence>
                    {expandedDays[dayIndex] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm"
                      >
                        <div className="p-6 space-y-4">
                          {/* Objectives */}
                          <div>
                            <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center">
                              <FaCheckCircle className="mr-2 text-green-600" />
                              Learning Objectives
                            </h5>
                            <ul className="space-y-1 ml-6">
                              {day.objectives.map((objective, idx) => (
                                <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                                  <span className="text-green-600 mr-2">→</span>
                                  {objective}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Resources */}
                          <div>
                            <h5 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center">
                              <FaBook className="mr-2 text-blue-600" />
                              Learning Resources
                            </h5>
                            <div className="space-y-2">
                              {day.resources.map((resource, idx) => (
                                <a
                                  key={idx}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between bg-white dark:bg-slate-700 rounded-lg p-3 hover:shadow-md transition-shadow border border-gray-200 dark:border-slate-600"
                                >
                                  <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">{resource.title}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">{resource.type}</p>
                                  </div>
                                  <FaExternalLinkAlt className="text-blue-600" />
                                </a>
                              ))}
                            </div>
                          </div>

                          {/* Assignments */}
                          <div>
                            <h5 className="font-bold text-gray-800 dark:text-white mb-2">✏️ Assignments</h5>
                            <div className="space-y-2">
                              {day.assignments.map((assignment, idx) => (
                                <label
                                  key={idx}
                                  className="flex items-start p-3 bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                                >
                                  <input
                                    type="checkbox"
                                    checked={completedTasks[`${dayIndex}-${idx}`] || false}
                                    onChange={() => toggleTask(dayIndex, idx)}
                                    className="mt-1 mr-3 w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                                  />
                                  <span className={`text-gray-700 dark:text-gray-300 ${completedTasks[`${dayIndex}-${idx}`] ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                                    {assignment}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Mini Project */}
                          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg p-4 border-2 border-purple-300 dark:border-purple-700">
                            <h5 className="font-bold text-gray-800 dark:text-white mb-2">🚀 Mini Project</h5>
                            <p className="text-gray-700 dark:text-gray-300">{day.project}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Reset Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setStudyPlan(null)}
                className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition-colors border border-white/30"
              >
                Generate New Plan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default WeeklyStudyPlanner;
