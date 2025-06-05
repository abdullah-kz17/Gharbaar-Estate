import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* 404 Image */}
            <img
                src="/images/404.png"
                alt="404 Not Found"
                className="w-64 sm:w-72 md:w-96 mb-8 select-none"
                loading="lazy"
            />

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Oops! Page Not Found
            </h1>

            {/* Description */}
            <p className="text-center text-gray-600 dark:text-gray-400 max-w-md mb-6">
                The page you're looking for doesn't exist or has been moved.
            </p>

            {/* Back Home Button */}
            <Link
                to="/"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm sm:text-base font-semibold rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500"
            >
                Go to Home
            </Link>
        </div>
    );
}
