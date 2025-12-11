import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoneyBillWave, FaChartLine, FaSpinner, FaGlobeAmericas, FaBriefcase, FaLightbulb } from 'react-icons/fa';

const SalaryPredictor = ({ career }) => {
  const [experienceYears, setExperienceYears] = useState(0);
  const [location, setLocation] = useState('India');
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const predictSalary = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/ai/salary-predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerTitle: career.title,
          experienceYears,
          location,
          skills: career.skills
        })
      });

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error predicting salary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatSalary = (amount) => {
    if (location === 'India') {
      return `₹${(amount / 100000).toFixed(1)} LPA`;
    } else {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl shadow-xl p-8 mb-8 border-2 border-green-200 dark:border-green-800 transition-colors duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-semibold mr-3">
              AI POWERED
            </span>
            Salary Predictor
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Estimate your earning potential for {career.title}</p>
        </div>
        <FaMoneyBillWave className="text-6xl text-green-300" />
      </div>

      {!prediction && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-green-200 dark:border-green-800 shadow-sm transition-colors duration-200">
          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Experience Years */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <FaBriefcase className="mr-2 text-green-600" />
                Years of Experience
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={experienceYears}
                onChange={(e) => setExperienceYears(Math.max(0, Math.min(30, parseInt(e.target.value) || 0)))}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-white font-semibold focus:border-green-500 focus:outline-none"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Enter 0 for fresh graduates</p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <FaGlobeAmericas className="mr-2 text-green-600" />
                Job Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-700 dark:text-white font-semibold focus:border-green-500 focus:outline-none appearance-none cursor-pointer"
                disabled={isLoading}
              >
                <option value="India">🇮🇳 India</option>
                <option value="USA">🇺🇸 United States</option>
                <option value="UK">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="Germany">🇩🇪 Germany</option>
                <option value="Global">🌍 Global (Remote)</option>
              </select>
            </div>
          </div>

          {/* Predict Button */}
          <button
            onClick={predictSalary}
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Calculating Your Salary...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <FaChartLine className="mr-2" />
                Predict My Salary
              </span>
            )}
          </button>
        </div>
      )}

      {/* Prediction Results */}
      <AnimatePresence>
        {prediction && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            {/* Summary */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-xl p-6 shadow-lg">
              <p className="text-lg mb-4">{prediction.summary}</p>
              {prediction.demoMode && (
                <p className="text-sm text-green-100">
                  💡 Demo Mode: Add OpenAI credits for AI-powered salary predictions
                </p>
              )}
            </div>

            {/* Predicted Salary Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border-2 border-green-300 dark:border-green-700 shadow-lg text-center transition-colors duration-200">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">PREDICTED ANNUAL SALARY</p>
              <p className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                {formatSalary(prediction.predictedSalary.annual)}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Range: {formatSalary(prediction.salaryRange.min)} - {formatSalary(prediction.salaryRange.max)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You're in the <span className="font-bold text-green-600 dark:text-green-400">{prediction.percentile} percentile</span> for this role
              </p>
            </div>

            {/* Salary by Experience */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-colors duration-200">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4 flex items-center">
                <FaChartLine className="mr-2 text-green-600" />
                Salary Growth by Experience
              </h3>
              <div className="space-y-3">
                {prediction.salaryByExperience.map((level, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      experienceYears >= parseInt(level.years.split('-')[0]) &&
                      experienceYears <= (parseInt(level.years.split('-')[1]) || 100)
                        ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600'
                        : 'bg-gray-50 dark:bg-slate-700 border border-gray-200 dark:border-slate-600'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{level.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{level.years} years</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600 dark:text-green-400">
                        {location === 'India' ? formatSalary(level.india) : formatSalary(level.global)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Factors */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-green-200 dark:border-green-800 transition-colors duration-200">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4">💰 Salary Factors</h3>
              <div className="space-y-3">
                {prediction.factors.map((factor, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 dark:text-white">{factor.factor}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{factor.description}</p>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-bold ml-4">
                      {factor.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-4 flex items-center">
                <FaLightbulb className="mr-2 text-yellow-500" />
                Market Insights
              </h3>
              <ul className="space-y-2">
                {prediction.insights.map((insight, index) => (
                  <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">→</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* New Prediction Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setPrediction(null)}
                className="px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Calculate Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default SalaryPredictor;
