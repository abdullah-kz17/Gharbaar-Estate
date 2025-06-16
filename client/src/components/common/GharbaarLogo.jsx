import React from 'react';

const GharBaarLogo = () => {
  return (
    <div className="flex items-center space-x-3 group cursor-pointer">
      {/* Logo Icon */}
      <div className="relative flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 shadow-md group-hover:scale-105 transition-transform duration-300 dark:shadow-none">
        <svg
          className="h-6 w-6 text-white dark:text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.5L2 10v1h2v8.5c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5V11h2v-1L12 2.5z" opacity="0.9"/>
          <rect x="10" y="15" width="4" height="5" rx="0.5" fill="rgba(255,255,255,0.3)" />
          <circle cx="8" cy="14" r="1.5" fill="rgba(255,255,255,0.4)" />
          <circle cx="16" cy="14" r="1.5" fill="rgba(255,255,255,0.4)" />
          <rect x="16" y="6" width="2" height="4" rx="0.5" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight dark:from-indigo-300 dark:to-purple-400">
          Gharbaar
        </span>
        <span className="text-sm font-semibold tracking-wide text-indigo-400 dark:text-purple-300">
          Estate
        </span>
      </div>
    </div>
  );
};

export default GharBaarLogo;
