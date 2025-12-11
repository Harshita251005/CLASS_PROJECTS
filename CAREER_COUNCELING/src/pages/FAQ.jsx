import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 mb-4 transition-colors">
      <button
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
        onClick={onClick}
      >
        <span className="font-semibold text-gray-900 dark:text-white text-lg">{question}</span>
        {isOpen ? (
          <FaMinus className="text-primary flex-shrink-0" />
        ) : (
          <FaPlus className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is CareerPath?",
      answer: "CareerPath is an AI-driven career counseling platform designed to help students and professionals discover their ideal career paths. We maintain a comprehensive database of careers, skills, roadmaps, and educational resources to guide you from exploration to employment."
    },
    {
      question: "Is CareerPath free to use?",
      answer: "Yes! CareerPath offers free access to career exploration, quizzes, and roadmaps. Some advanced AI features may require a premium subscription in the future, but our core mission is to provide accessible guidance to everyone."
    },
    {
      question: "How accurate is the AI career quiz?",
      answer: "Our AI analysis is based on established psychological frameworks and career data. While it provides highly personalized recommendations based on your inputs, we encourage using it as a starting point for exploration rather than a definitive answer. Combine it with your own research and intuition."
    },
    {
      question: "Can I get a personalized roadmap?",
      answer: "Absolutely. Every career profile on our platform comes with a detailed, step-by-step roadmap. Additionally, our AI Assistant can generate custom study plans and advice tailored to your specific background and goals."
    },
    {
      question: "Do you offer direct counseling from human experts?",
      answer: "Currently, we focus on scalable AI-driven guidance. However, we are working on a feature to connect users with certified human career counselors for 1-on-1 sessions. Stay tuned for updates!"
    },
    {
      question: "How do I update my profile?",
      answer: "You can update your profile by clicking on your avatar or name in the navigation bar and selecting 'Profile'. From there, you can edit your personal details, skills, and interests."
    },
    {
      question: "I forgot my password. How can I reset it?",
      answer: "On the Login page, click the 'Forgot password?' link. Enter your registered email address, and we will send you instructions on how to reset your password securely."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about using CareerPath.
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-primary font-semibold hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
