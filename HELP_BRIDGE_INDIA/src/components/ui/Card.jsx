import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-3 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 mt-auto ${className}`}>
    {children}
  </div>
);

export const CardImage = ({ src, alt, className = '' }) => (
  <div className="relative h-48 overflow-hidden">
    <img 
      src={src} 
      alt={alt} 
      className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${className}`} 
    />
  </div>
);

export default Card;
