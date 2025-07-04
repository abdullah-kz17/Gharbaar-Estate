import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import PageHeader from '../../components/common/PageHeader';

export default function Profile() {
  const { user } = useAuth();
  const { username, email, profilePic, role, isAdmin } = user || {};

  return (
    <>
      <PageHeader
        title="Your Profile"
        subtitle="View and manage your personal information, preferences, and account settings."
        backgroundImage="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1500&q=80"
      />
      <section className="min-h-screen bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl max-w-sm w-full p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-300">

          {/* Profile Image */}
          <div className="rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
            <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt={`${username || "User"} profile`}
                className="rounded-full w-32 h-32 sm:w-36 sm:h-36 object-cover border-4 border-white dark:border-gray-800"
            />
          </div>

          {/* Username */}
          <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-wide">
            {username || "Anonymous"}
          </h1>

          {/* Email */}
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium break-words">
            {email || "No Email Provided"}
          </p>

          {/* Role Badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="px-4 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded-full font-semibold text-xs uppercase tracking-wide">
            {role || "User"}
          </span>
            {isAdmin && (
                <span className="px-4 py-1 bg-red-600 text-white rounded-full font-semibold text-xs uppercase tracking-wide shadow-md">
              Admin
            </span>
            )}
          </div>

          {/* Edit Button */}
          <Link
              to="/update-profile"
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
              aria-label="Edit Profile"
          >
            <FaEdit className="text-xl" />
            Edit Profile
          </Link>
        </div>
      </section>
    </>
  );
}
