import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

export default function Cta({ isVisible, isLoggedIn }) {
    return (
        <section className="py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900 dark:to-indigo-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="relative px-8 py-16 md:p-16">
                        <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-10 md:gap-0">
                            {/* Text Content */}
                            <div className="md:w-2/3 text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
                                    Ready to Find Your Perfect Home?
                                </h2>
                                <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed drop-shadow-sm">
                                    Join thousands of satisfied clients who found their dream home or renovation solution with our intelligent platform.
                                </p>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to={isLoggedIn ? "/properties" : "/register"}
                                        className="
                      bg-white text-indigo-600 font-semibold
                      px-8 py-4 rounded-full shadow-md
                      hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300
                      transition duration-300 inline-block
                      dark:bg-indigo-50 dark:text-indigo-700 dark:focus:ring-indigo-500
                    "
                                    >
                                        {isLoggedIn ? "Explore Properties" : "Get Started for Free"}
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Animated Icon */}
                            <div className="md:w-1/3 flex justify-center">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0],
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 5,
                                        ease: "easeInOut",
                                    }}
                                    className="w-48 h-48 relative"
                                >
                                    <div className="absolute inset-0 bg-white/20 rounded-full dark:bg-white/10"></div>
                                    <div className="absolute inset-2 bg-white/30 rounded-full dark:bg-white/20"></div>
                                    <div className="absolute inset-4 bg-white/40 rounded-full flex items-center justify-center dark:bg-white/30">
                                        <FaHome className="text-white text-6xl drop-shadow-lg" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative overlay for subtle effect */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-700 to-purple-700 opacity-30 mix-blend-multiply rounded-3xl"
                    />
                </motion.div>
            </div>
        </section>
    );
}
