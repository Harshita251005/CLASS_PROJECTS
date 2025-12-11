import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import quizQuestions from '../data/quizQuestions';
import { FaCheckCircle, FaRedo, FaBrain, FaSpinner } from 'react-icons/fa';
import AIRecommendationCard from '../components/AIRecommendationCard';
import axios from 'axios';

const CareerQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [aiResults, setAIResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      analyzeWithAI(newAnswers);
    }
  };

  const analyzeWithAI = async (userAnswers) => {
    setIsAnalyzing(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/ai/quiz-analysis', {
        answers: userAnswers,
        quizQuestions: quizQuestions
      });

      setAIResults(response.data);
      setShowResults(true);

      // Increment quizzesCompleted stat
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await axios.put('http://localhost:5000/api/profile', {
            incrementStats: { quizzesCompleted: 1 }
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
      } catch (statError) {
        console.error('Error updating stats:', statError);
      }
    } catch (error) {
      console.error('Error getting AI analysis:', error);
      // Fallback to basic analysis if AI fails
      const fallbackResults = {
        recommendations: [
          {
            career: "Software Engineer",
            matchPercentage: 85,
            reasoning: "AI analysis temporarily unavailable. Please ensure your OpenAI API key is configured.",
            strengths: ["Problem-solving", "Logical thinking"],
            weaknesses: ["Communication skills"],
            roadmap: [
              { phase: "Foundation", duration: "3-6 months", steps: ["Learn basics"] }
            ]
          }
        ],
        personalityInsights: "AI analysis temporarily unavailable."
      };
      setAIResults(fallbackResults);
      setShowResults(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setAIResults(null);
  };


  // Show analyzing state
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-light py-12 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FaBrain className="text-primary text-6xl mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-dark mb-2">Analyzing Your Responses...</h2>
          <p className="text-gray-600">Our AI is creating your personalized career recommendations</p>
          <div className="flex gap-2 justify-center mt-4">
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    );
  }

  if (showResults && aiResults) {
    return (
      <div className="min-h-screen bg-light dark:bg-slate-900 py-12 transition-colors duration-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-dark dark:text-white mb-2">Your AI Career Analysis</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">Powered by advanced AI psychological analysis</p>
            </div>

            {/* Personality Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <FaBrain /> Personality Insights
              </h2>
              <p className="text-lg leading-relaxed">{aiResults.personalityInsights}</p>
            </motion.div>

            {/* AI Career Recommendations */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Top 3 Career Matches</h2>
              {aiResults.recommendations.map((recommendation, index) => (
                <AIRecommendationCard 
                  key={index} 
                  recommendation={recommendation} 
                  index={index} 
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors"
              >
                <FaRedo className="mr-2" /> Retake Quiz
              </button>
              <div>
                <Link to="/careers" className="text-primary hover:underline">
                  Explore All Careers
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-light dark:bg-slate-900 py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-primary h-2 rounded-full transition-all duration-300"
            ></motion.div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-slate-700"
        >
          <div className="mb-6">
            <span className="text-sm text-primary font-semibold">{question.category}</span>
            <h2 className="text-2xl font-bold text-dark dark:text-white mt-2">{question.question}</h2>
          </div>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 bg-gray-50 dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-600 border-2 border-gray-200 dark:border-slate-600 hover:border-primary dark:hover:border-primary rounded-lg transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <span className="bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-500 group-hover:border-primary rounded-full w-6 h-6 flex items-center justify-center mr-4 flex-shrink-0 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{option.text}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CareerQuiz;
