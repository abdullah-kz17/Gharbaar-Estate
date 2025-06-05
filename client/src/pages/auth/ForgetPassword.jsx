import React, { useState } from 'react';
import { axiosPublic } from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import {Link} from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await axiosPublic.post('/auth/forgot-password', { email: trimmedEmail });

      if (response?.data?.success) {
        toast.success('Reset email sent successfully');
        setEmail('');
      } else {
        toast.error(response?.data?.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error?.response?.data?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-white transition-colors">
        <div className="w-full max-w-md bg-white text-gray-800 shadow-2xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
            Forgot Your Password?
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Enter your registered email address and we'll send you a password reset link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 text-white py-2 rounded-md transition duration-200 ${
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
                    Sending...
                  </>
              ) : (
                  'Send Reset Link'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/login" className="text-indigo-600 hover:underline font-medium">
              Go back to login
            </Link>
          </p>
        </div>
      </div>
  );
}
