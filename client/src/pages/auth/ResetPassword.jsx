import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosPublic } from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosPublic.post(`/auth/reset-password/${token}`, { password });

      if (response.data.success) {
        toast.success('Password reset successfully');
        setPassword('');
        setConfirmPassword('');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error?.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white transition-colors">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-2xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-white mb-2">
            Reset Your Password
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
            Create a new password to access your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-9 text-gray-500 dark:text-gray-300"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="********"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 text-white py-2 rounded-lg transition duration-200 ${
                    loading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
            >
              {loading ? (
                  <>
                    <svg
                        className="w-5 h-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      ></circle>
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a10 10 0 00-8 10h4z"
                      ></path>
                    </svg>
                    Resetting...
                  </>
              ) : (
                  'Reset Password'
              )}
            </button>
          </form>
        </div>
      </div>
  );
}
