import React from 'react';
import { FaHome } from 'react-icons/fa';

const Loader = ({ fullScreen = false, size = "medium", text = "Loading..." }) => {
    // Configure size classes
    const sizeClasses = {
        small: {
            container: "w-16 h-16",
            circle: "w-16 h-16",
            icon: "w-6 h-6",
        },
        medium: {
            container: "w-20 h-20",
            circle: "w-20 h-20",
            icon: "w-8 h-8",
        },
        large: {
            container: "w-24 h-24",
            circle: "w-24 h-24",
            icon: "w-10 h-10",
        }
    };

    // Get appropriate size classes
    const { container, circle, icon } = sizeClasses[size] || sizeClasses.medium;

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95 z-50">
                <div className={`relative ${container}`}>
                    {/* Spinning outer gradient circle */}
                    <div className={`${circle} rounded-full absolute border-4 border-t-transparent border-l-transparent border-r-indigo-600 border-b-purple-600 animate-spin`}></div>

                    {/* Pulse effect for the logo */}
                    <div className={`${circle} rounded-full absolute flex items-center justify-center`}>
                        <div className="absolute w-3/5 h-3/5 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center animate-pulse">
                            <FaHome className={`${icon} text-indigo-600 dark:text-indigo-400`} />
                        </div>
                    </div>
                </div>

                {/* Text with gradient */}
                <div className="mt-6 text-center">
                    <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-bold text-xl">
                        {text}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Please wait while we prepare your experience
                    </p>
                </div>
            </div>
        );
    }

    // Inline version (non-fullscreen)
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className={`relative ${container}`}>
                {/* Spinning outer gradient circle */}
                <div className={`${circle} rounded-full absolute border-4 border-t-transparent border-l-transparent border-r-indigo-600 border-b-purple-600 animate-spin`}></div>

                {/* Center logo with pulse effect */}
                <div className={`${circle} rounded-full absolute flex items-center justify-center`}>
                    <div className="absolute w-3/5 h-3/5 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center animate-pulse">
                        <FaHome className={`${icon} text-indigo-600 dark:text-indigo-400`} />
                    </div>
                </div>
            </div>

            {/* Optional text */}
            {text && (
                <p className="mt-4 text-gray-700 dark:text-gray-300 font-medium">
                    {text}
                </p>
            )}
        </div>
    );
};

export default Loader;

// Usage examples:
//
// 1. Full-screen loader (for initial page load or important operations)
// <Loader fullScreen text="Loading Properties..." />
//
// 2. Inline loader (small)
// <Loader size="small" text="Searching..." />
//
// 3. Inline loader without text
// <Loader text="" />
//
// 4. Medium inline loader with custom text
// <Loader size="medium" text="Processing..." />
//
// 5. Large inline loader
// <Loader size="large" />