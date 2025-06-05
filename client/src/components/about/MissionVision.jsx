// src/components/about/MissionVisionSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    FaLightbulb,
    FaBuilding,
    FaHeart,
} from 'react-icons/fa';

export default function MissionVisionSection({ isVisible }) {
    return (
        <section
            id="mission"
            className="relative py-24 bg-gradient-to-b from-indigo-100 to-white dark:from-indigo-950 dark:to-indigo-900 transition-colors duration-500"
        >
            {/* Decorative SVGs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg
                    className="absolute left-0 top-0 opacity-10"
                    width="500"
                    height="500"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="250" cy="250" r="200" fill="#4f46e5" />
                </svg>
                <svg
                    className="absolute right-0 bottom-0 opacity-10"
                    width="600"
                    height="600"
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="300" cy="300" r="250" fill="#8b5cf6" />
                </svg>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible.mission ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-5 py-1.5 rounded-full uppercase tracking-wider shadow">
                        Who We Are
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-indigo-100 mt-5">
                        Our Mission & Vision
                    </h2>
                </motion.div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible.mission ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                alt="Team collaboration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isVisible.mission ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-10"
                    >
                        {/* Mission */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-indigo-100 mb-3 flex items-center">
                                <FaLightbulb className="text-indigo-600 dark:text-indigo-400 mr-3 text-xl" />
                                Our Mission
                            </h3>
                            <p className="text-gray-700 dark:text-indigo-300 text-lg leading-relaxed">
                                To revolutionize the real estate experience by seamlessly connecting property buyers,
                                sellers, and service providers through innovative AI-driven solutions. We're committed
                                to making home transformations accessible, transparent, and stress-free for everyone.
                            </p>
                        </div>

                        {/* Vision */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-indigo-100 mb-3 flex items-center">
                                <FaBuilding className="text-purple-600 dark:text-purple-400 mr-3 text-xl" />
                                Our Vision
                            </h3>
                            <p className="text-gray-700 dark:text-indigo-300 text-lg leading-relaxed">
                                To be the world's leading platform where anyone can effortlessly find, transform, and
                                love their perfect living space. We envision a future where AI technology brings
                                personalized real estate experiences to millions.
                            </p>
                        </div>

                        {/* Promise */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-indigo-100 mb-3 flex items-center">
                                <FaHeart className="text-rose-500 dark:text-rose-400 mr-3 text-xl" />
                                Our Promise
                            </h3>
                            <p className="text-gray-700 dark:text-indigo-300 text-lg leading-relaxed">
                                We promise unwavering quality, integrity in all interactions, and continuous innovation.
                                Every property and service featured on our platform undergoes rigorous verification.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
