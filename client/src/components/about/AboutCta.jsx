import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CallToAction() {
    return (
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-800 relative overflow-hidden transition-colors duration-500">
            {/* Decorative Background Circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute left-0 bottom-0 opacity-10" width="600" height="600" viewBox="0 0 600 600">
                    <circle cx="300" cy="300" r="300" fill="white" />
                </svg>
                <svg className="absolute right-0 top-0 opacity-10" width="400" height="400" viewBox="0 0 400 400">
                    <circle cx="200" cy="200" r="200" fill="white" />
                </svg>
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Ready to Reimagine Your Perfect Space?
                    </h2>
                    <p className="text-lg sm:text-xl text-indigo-100 dark:text-indigo-200 mb-10 max-w-3xl mx-auto">
                        Join thousands of satisfied homeowners who've transformed their living experience with our platform.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/register"
                                className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                            >
                                Get Started Today
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
