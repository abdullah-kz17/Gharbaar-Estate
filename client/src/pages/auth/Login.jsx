import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { axiosPublic } from '../../utils/axiosInstance.js';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [resending, setResending] = useState(false);
  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    try {
      setLoading(true);
      setUnverifiedEmail('');
      const { data } = await axiosPublic.post('/auth/login', formData);

      if (data.token) {
        storeTokenInLS(data.token);
        toast.success('Login successful!');
        setFormData({ email: '', password: '' });
        navigate('/');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      if (message.toLowerCase().includes('verify your email')) {
        setUnverifiedEmail(formData.email);
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    if (!unverifiedEmail) return;

    try {
      setResending(true);
      const { data } = await axiosPublic.post('/auth/resend-verification', { email: unverifiedEmail });
      toast.success(data.message || 'Verification email sent.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend verification email');
    } finally {
      setResending(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4 ">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl max-w-md w-full p-8 md:p-10 dark:text-gray-100">
          <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-6">Login to Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100 transition-all"
                  placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-gray-100 transition-all"
                    placeholder="Enter your password"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-indigo-500 dark:text-indigo-300 hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Unverified Email Notice */}
            {unverifiedEmail && (
                <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 p-3 rounded text-sm">
                  Your email is not verified.{' '}
                  <button
                      onClick={handleResendVerification}
                      className="text-indigo-600 dark:text-indigo-300 font-medium hover:underline"
                      disabled={resending}
                  >
                    {resending ? 'Sending...' : 'Click here to verify.'}
                  </button>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300 ease-in-out ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-indigo-600 hover:to-purple-700'
                }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
            Don’t have an account?{' '}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-300 hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
  );
}
