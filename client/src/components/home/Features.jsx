import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaSearchLocation, FaRobot, FaBuilding } from "react-icons/fa";

export default function Features({ isVisible }) {
    const features = [
        {
            icon: <FaHome className="text-indigo-600 dark:text-indigo-400 text-3xl mb-3" aria-hidden="true" />,
            title: "AI Property Finder",
            description:
                "Tell us your requirements in plain language — our AI handles the rest.",
        },
        {
            icon: <FaSearchLocation className="text-purple-600 dark:text-purple-400 text-3xl mb-3" aria-hidden="true" />,
            title: "Virtual Tours",
            description: "Explore properties from anywhere with our immersive 3D tours.",
        },
        {
            icon: <FaRobot className="text-pink-500 dark:text-pink-400 text-3xl mb-3" aria-hidden="true" />,
            title: "Renovation Simulator",
            description: "Visualize renovations before you commit with our AI simulator.",
        },
        {
            icon: <FaBuilding className="text-amber-500 dark:text-amber-400 text-3xl mb-3" aria-hidden="true" />,
            title: "Market Insights",
            description: "Make informed decisions with real-time market analytics.",
        },
    ];

    return (
        <section
            id="features"
            className="py-24 bg-white dark:bg-gray-900 transition-colors duration-500"
            aria-label="Platform Features"
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full uppercase tracking-wider select-none">
            Smart Platform
          </span>
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-4">
                        Powerful Features
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
                        Our AI-powered platform provides intelligent tools to make your real estate journey seamless and effective.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="rounded-2xl overflow-hidden shadow-xl relative"
                    >
                        <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center relative">
                            <img
                                src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                alt="Smart Home Interface showcasing AI-powered property matching"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white pointer-events-none">
                                <h3 className="text-2xl font-bold mb-2">Smart Property Matching</h3>
                                <p className="text-gray-200">
                                    AI-powered recommendations tailored to your preferences
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100 dark:border-gray-700 cursor-default focus:outline-none focus:ring-4 focus:ring-indigo-500 dark:focus:ring-purple-600"
                                    tabIndex={0}
                                    role="article"
                                    aria-labelledby={`feature-title-${index}`}
                                    aria-describedby={`feature-desc-${index}`}
                                >
                                    {feature.icon}
                                    <h3
                                        id={`feature-title-${index}`}
                                        className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100"
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        id={`feature-desc-${index}`}
                                        className="text-gray-600 dark:text-gray-300 text-sm"
                                    >
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
