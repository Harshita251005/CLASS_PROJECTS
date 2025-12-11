import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AIRecommendationCard = ({ recommendation, index }) => {
  // Convert career name to career ID for linking
  const getCareerIdFromName = (careerName) => {
    return careerName.toLowerCase().replace(/[\s/]+/g, '-');
  };

  const careerId = getCareerIdFromName(recommendation.career);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl shadow-lg p-6 mb-6 border-2 border-indigo-100 dark:border-slate-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
            {index + 1}
          </span>
          <div>
            <h3 className="text-2xl font-bold text-dark dark:text-white">{recommendation.career}</h3>
            <div className="flex items-center gap-2 mt-1">
              <FaStar className="text-yellow-500" />
              <span className="text-primary font-bold text-lg">{recommendation.matchPercentage}% Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Bar */}
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${recommendation.matchPercentage}%` }}
          transition={{ delay: index * 0.15 + 0.3, duration: 0.8 }}
          className="bg-gradient-to-r from-primary to-indigo-600 h-3 rounded-full"
        />
      </div>

      {/* AI Reasoning */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Why this career suits you:</h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{recommendation.reasoning}</p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Strengths */}
        <div>
          <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
            <FaCheckCircle /> Your Strengths
          </h4>
          <div className="space-y-2">
            {recommendation.strengths.map((strength, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas to Improve */}
        <div>
          <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-3 flex items-center gap-2">
            <FaExclamationTriangle /> Areas to Develop
          </h4>
          <div className="space-y-2">
            {recommendation.weaknesses.map((weakness, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">→</span>
                <span className="text-sm text-gray-700 dark:text-gray-300">{weakness}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Roadmap */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">Your Personalized Roadmap:</h4>
        <div className="space-y-4">
          {recommendation.roadmap.map((phase, idx) => (
            <div key={idx} className="relative pl-6 pb-4 border-l-2 border-primary last:border-0">
              <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full"></div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm dark:shadow-slate-900/50">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-dark dark:text-white">{phase.phase}</h5>
                  <span className="text-xs text-primary bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 rounded-full">
                    {phase.duration}
                  </span>
                </div>
                <ul className="space-y-1">
                  {phase.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learn More Button */}
      <Link
        to={`/careers/detail/${careerId}`}
        className="inline-block w-full text-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        Explore {recommendation.career} Details →
      </Link>
    </motion.div>
  );
};

export default AIRecommendationCard;

