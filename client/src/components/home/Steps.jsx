// Steps.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Steps({ isVisible, isLoggedIn }) {
    const steps = [
        {
            step: "1",
            title: "Create Your Profile",
            description: "Sign up and tell us about your preferences, goals, and requirements.",
        },
        {
            step: "2",
            title: "Explore & Discover",
            description: "Browse properties or renovation options enhanced with AI recommendations.",
        },
        {
            step: "3",
            title: "Connect & Engage",
            description: "Reach out to verified sellers, buyers, or service providers.",
        },
        {
            step: "4",
            title: "Finalize & Succeed",
            description: "Complete your transaction or project with our end-to-end support.",
        },
    ];

    return (
        <section
            id="steps"
            className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-500"
        >
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                        <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#4338ca" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
          <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-5 py-1 rounded-full uppercase tracking-wider select-none">
            Process
          </span>
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-12 leading-tight">
                        How It Works
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
                        Our intelligent platform simplifies every step of your real estate journey, whether you're buying, selling, or renovating.
                    </p>
                </motion.div>

                {/* Vertical timeline line */}
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-100 dark:bg-indigo-700 z-0 rounded" />

                    <div className="relative z-10">
                        {steps.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`flex items-center mb-16 flex-col md:flex-row ${
                                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                {/* Text content */}
                                <div
                                    className={`w-full md:w-1/2 px-4 md:px-8 ${
                                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                                    }`}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Step circle */}
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold shadow-lg flex items-center justify-center mx-8 my-6 md:my-0">
                                    {item.step}
                                </div>

                                {/* Empty spacer for layout */}
                                <div className="hidden md:block w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-12"
                >
                    <Link
                        to={isLoggedIn ? "/user-dashboard" : "/register"}
                        className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300"
                    >
                        {isLoggedIn ? "Go to Dashboard" : "Start Your Journey"}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
