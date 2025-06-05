// src/components/about/AboutHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

export default function AboutHero({ scrollY, scrollToMission }) {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')",
                    transform: `translateY(${scrollY * 0.5}px)`,
                    filter: 'brightness(0.6)',
                }}
            />

            {/* Animated shapes */}
            <AnimatedBackgroundShapes />

            {/* Hero content */}
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
                        About <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                            Our Team
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-gray-100">
                        Meet the innovative minds behind the platform that's transforming how you experience real estate.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button
                            onClick={scrollToMission}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                        >
                            Discover Our Story
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <button onClick={scrollToMission} className="text-white">
                        <FaChevronDown className="text-3xl" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}

function AnimatedBackgroundShapes() {
    return (
        <>
            <motion.div
                className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20 bg-purple-500"
                animate={{ x: [0, 10, 0], y: [0, 15, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 left-20 w-96 h-96 rounded-full opacity-20 bg-indigo-500"
                animate={{ x: [0, -15, 0], y: [0, 10, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full opacity-10 bg-pink-500"
                animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            />
        </>
    );
}
