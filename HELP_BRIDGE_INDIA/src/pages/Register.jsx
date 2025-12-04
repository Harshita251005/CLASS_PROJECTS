import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Heart } from 'lucide-react';
import Card, { CardBody } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-primary-600 text-white p-3 rounded-2xl mb-4">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Help Bridge</h2>
          <p className="text-gray-600">
            Create your account to access the platform
          </p>
        </div>
        
        <Card>
          <CardBody className="p-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="name"
                label="Full Name"
                icon={User}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                id="email"
                type="email"
                label="Email Address"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                id="password"
                type="password"
                label="Password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <Button type="submit" className="w-full" isLoading={loading} icon={ArrowRight}>
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Sign In
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;
