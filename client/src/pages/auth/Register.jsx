import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { axiosPublic } from '../../utils/axiosInstance.js';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, address, phone } = formData;

    // Basic validation
    if (!username || !email || !password || !address || !phone) {
      toast.error('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosPublic.post('/auth/register', formData);
      const result = response.data;

      if (result.token) {
        storeTokenInLS(result.token);
        toast.success('Registration successful. Please verify your email and phone.');
        setFormData({
          username: '',
          email: '',
          password: '',
          address: '',
          phone: '',
        });
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex my-4 items-center justify-center bg-white px-4">
        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Username</label>
              <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-purple-400"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your address"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2 rounded-md transition duration-200 ${
                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
  );
}
