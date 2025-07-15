import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaSearch, FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import {useAuth} from "../../context/AuthContext.jsx";

export default function Hero() {
    const { isLoggedIn, user } = useAuth();

    const [scrollY, setScrollY] = useState(0);

    // Sample statistics data
    const stats = [
        { number: '5000+', label: 'Properties Listed' },
        { number: '2500+', label: 'Happy Clients' },
        { number: '150+', label: 'Expert Agents' },
        { number: '50+', label: 'Cities Covered' }
    ];

    // Handle smooth scrolling
    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Update scrollY for parallax
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col">
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')",
                        transform: `translateY(${scrollY * 0.3}px)`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/40"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm"
                    animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
                    transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-32 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm"
                    animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
            </div>

            {/* Main Hero Content - Single Column */}
            <div className="relative z-20 flex-1 flex flex-col justify-center px-4 py-20">
                <div className="max-w-4xl mx-auto w-full text-center">
                    {user?.username && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mb-4"
                        >
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 rounded-full text-sm font-medium backdrop-blur-sm">
                                Welcome back, {user.username}! 👋
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
                    >
                        Find Your
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Dream Home
                        </span>
                        Today
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed max-w-2xl mx-auto"
                    >
                        Discover premium properties with our AI-powered platform. Buy, sell, or renovate with confidence and expert guidance.
                    </motion.p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to={isLoggedIn ? '/properties' : '/register'}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 transform hover:shadow-indigo-500/25"
                            >
                                <FaSearch />
                                {isLoggedIn ? 'Browse Properties' : 'Start Your Search'}
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <a href="#features" className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                                <FaPlay />
                                Explore Features
                            </a>
                        </motion.div>
                    </div>

                    {/* Statistics */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <button
                    onClick={scrollToServices}
                    className="text-white/80 hover:text-white transition-colors duration-300 flex flex-col items-center gap-2"
                    aria-label="Scroll to services"
                >
                    <span className="text-sm font-medium">Explore More</span>
                    <FaChevronDown className="text-2xl" />
                </button>
            </motion.div>
        </section>
    );
}