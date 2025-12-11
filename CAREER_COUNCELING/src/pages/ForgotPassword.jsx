import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from 'react-icons/fa';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter email, 2: Reset password
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    
    // Simulate API call to verify email
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      
      setIsLoading(false);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setErrors({ general: data.message || 'Failed to reset password' });
      }
    } catch (error) {
      setIsLoading(false);
      setErrors({ general: 'Server error. Please try again.' });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 text-center"
        >
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark dark:text-white mb-2">Password Reset Successful!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Your password has been updated successfully.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting to login...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary dark:text-indigo-400">
            CareerPath
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-dark dark:text-white">
            {step === 1 ? 'Forgot Password?' : 'Reset Password'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {step === 1 
              ? 'Enter your email to reset your password' 
              : 'Enter your new password'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-dark dark:text-gray-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-slate-600 focus:border-primary dark:focus:border-indigo-500'
                    }`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-indigo-700'
                }`}
              >
                {isLoading ? 'Verifying...' : 'Continue'}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              {/* General Error */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {errors.general}
                </div>
              )}

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-dark dark:text-gray-200 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.newPassword 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-slate-600 focus:border-primary dark:focus:border-indigo-500'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-dark dark:text-gray-200 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors dark:bg-slate-700 dark:text-white dark:placeholder-gray-400 ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-slate-600 focus:border-primary dark:focus:border-indigo-500'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                    <FaCheckCircle className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-500" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-indigo-700'
                }`}
              >
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-primary dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              ← Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
