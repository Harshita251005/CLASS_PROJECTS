import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { FaPaperPlane, FaRobot, FaUser, FaTrashAlt, FaLightbulb } from 'react-icons/fa';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Hello! I'm your AI Career Assistant. I can help you with career guidance, resume tips, interview preparation, and skill development advice. What's on your mind today?"
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

    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/ai/chat', {
        message: userMessage,
        careerContext: {
          title: 'General Career Counseling',
          overview: 'General advice on career paths, skills, education, and professional development.'
        }
      });

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
          text: 'Sorry, I encountered an error. Please try again later.'
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

  const clearChat = () => {
    setMessages([{
      role: 'bot',
      text: "Chat cleared. How can I help you now?"
    }]);
  };

  const suggestedTopics = [
    "How do I choose the right career?",
    "Tips for a successful job interview",
    "How to write a strong resume?",
    "Trends in the job market 2025",
    " Importance of soft skills"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-8 pb-12">
      <div className="container mx-auto px-4 max-w-4xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-t-2xl shadow-sm p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full text-white">
              <FaRobot size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">AI Career Assistant</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about your career journey</p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
            title="Clear Chat"
          >
            <FaTrashAlt />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white dark:bg-slate-800 overflow-y-auto p-6 space-y-6 shadow-sm">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  msg.role === 'user' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {msg.role === 'user' ? <FaUser size={14} /> : <FaRobot size={14} />}
                </div>
                <div
                  className={`p-4 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
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
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <FaRobot size={14} />
                </div>
                <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-b-2xl shadow-sm border-t border-gray-100 dark:border-slate-700">
           {messages.length < 3 && (
            <div className="mb-4 overflow-x-auto pb-2">
              <div className="flex gap-2">
                {suggestedTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(topic)}
                    className="flex-shrink-0 text-xs bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-600 px-3 py-1.5 rounded-full hover:bg-purple-50 dark:hover:bg-slate-600 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1"
                  >
                    <FaLightbulb className="text-yellow-500" />
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for advice..."
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-[52px] max-h-32 text-gray-800 dark:text-gray-200"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <FaPaperPlane />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            AI can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
