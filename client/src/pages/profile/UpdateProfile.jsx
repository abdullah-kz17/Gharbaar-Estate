import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../../utils/axiosInstance.js';
import { useNavigate } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';

export default function UpdateProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setUsername(user?.username || '');
    setEmail(user?.email || '');
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      if (profilePic) formData.append('profilePic', profilePic);

      const response = await axiosPrivate.put('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        setUser({
          ...user,
          username,
          email,
          profilePic: response.data.user.profilePic,
        });

        toast.success('Profile updated successfully!');
        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error updating profile');
      setError('An error occurred while updating the profile.');
    }
  };

  return (
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Update Profile
          </h2>

          {error && (
              <div className="text-red-600 dark:text-red-400 mb-4 text-sm font-medium">
                {error}
              </div>
          )}

          {/* Username */}
          <div className="mb-5">
            <label htmlFor="username" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
                id="username"
                type="text"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
                id="email"
                type="email"
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-6">
            <label htmlFor="profilePic" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
              Profile Picture
            </label>
            <input
                id="profilePic"
                type="file"
                className="w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-100 dark:hover:file:bg-gray-600"
                onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
                onClick={handleProfileUpdate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold rounded-full transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500"
            >
              <FaSave className="text-lg" />
              Save Changes
            </button>
          </div>
        </div>
      </section>
  );
}
