import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { FaComments, FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const Chatbot = ({ career }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `Hi! I'm your AI Career Mentor for ${career.title}. Ask me anything about this career path!`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/ai/chat', {
        message: userMessage,
        careerContext: {
          title: career.title,
          overview: career.overview,
        }
      });

      // Add bot response
      setMessages(prev => [
        ...prev,
        { role: 'bot', text: response.data.response }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: 'Sorry, I encountered an error. Please make sure your OpenAI API key is configured in the server.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    'How do I get started?',
    'What skills do I need?',
    `What is the salary for ${career.title}?`,
    'What certifications should I pursue?'
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 dark:bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 text-white p-4 rounded-t-xl">
              <div className="flex items-center gap-3">
                <FaRobot size={24} />
                <div>
                  <h3 className="font-bold">AI Career Mentor</h3>
                  <p className="text-xs text-indigo-100">{career.title}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-purple-600 dark:bg-purple-500 text-white'
                        : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 shadow'
                    }`}
                  >
                    <div className="text-sm">
                      <ReactMarkdown
                         components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />,
                          a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 shadow p-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-gray-50 dark:bg-slate-900">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                      }}
                      className="text-xs bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 px-3 py-1 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-600 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-b-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-purple-600 dark:bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
