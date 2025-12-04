import React from 'react';

const Input = ({ 
  label, 
  error, 
  id, 
  className = '', 
  type = 'text',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          className={`
            w-full px-4 py-2 rounded-lg border 
            focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all
            ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export const TextArea = ({ 
  label, 
  error, 
  id, 
  className = '', 
  rows = 4,
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`
          w-full px-4 py-2 rounded-lg border 
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export const Select = ({ 
  label, 
  error, 
  id, 
  options = [], 
  className = '', 
  placeholder = 'Select an option',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full px-4 py-2 rounded-lg border bg-white
          focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all
          ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-primary-200'}
          ${className}
        `}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
