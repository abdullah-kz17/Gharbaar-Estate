import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChevronDown, FaSearch, FaMapMarkerAlt, FaHome, FaBuilding, FaWarehouse, FaBed, FaBath, FaCar, FaPlay } from 'react-icons/fa';
import {useAuth} from "../../context/AuthContext.jsx";

export default function Hero() {
    const { isLoggedIn, user } = useAuth();

    const [scrollY, setScrollY] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [activeTab, setActiveTab] = useState('buy');

    // Sample statistics data
    const stats = [
        { number: '5000+', label: 'Properties Listed' },
        { number: '2500+', label: 'Happy Clients' },
        { number: '150+', label: 'Expert Agents' },
        { number: '50+', label: 'Cities Covered' }
    ];

    // Property types
    const propertyTypes = [
        { value: 'house', label: 'House', icon: <FaHome /> },
        { value: 'apartment', label: 'Apartment', icon: <FaBuilding /> },
        { value: 'commercial', label: 'Commercial', icon: <FaWarehouse /> }
    ];

    // Price ranges
    const priceRanges = [
        { value: '0-50000', label: 'Under $50K' },
        { value: '50000-100000', label: '$50K - $100K' },
        { value: '100000-200000', label: '$100K - $200K' },
        { value: '200000+', label: 'Above $200K' }
    ];

    // Handle smooth scrolling
    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', { searchQuery, propertyType, location, priceRange, activeTab });
        // Implement search logic here
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

            {/* Main Hero Content */}
            <div className="relative z-20 flex-1 flex flex-col justify-center px-4 py-20">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-white"
                        >
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

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                Find Your
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                                    Dream Home
                                </span>
                                Today
                            </h1>

                            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-xl">
                                Discover premium properties with our AI-powered platform.
                                Buy, sell, or rent with confidence and expert guidance.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mb-12">
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
                                    <button className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                                        <FaPlay />
                                        Watch Demo
                                    </button>
                                </motion.div>
                            </div>

                            {/* Statistics */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 + index * 0.1 }}
                                        className="text-center lg:text-left"
                                    >
                                        <div className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-gray-300 font-medium">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Right Content - Search Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:justify-self-end w-full max-w-md lg:max-w-lg"
                        >
                            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 lg:p-8 border border-white/20">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Find Properties</h3>
                                    <p className="text-gray-600">Search from thousands of properties</p>
                                </div>

                                {/* Tab Navigation */}
                                <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                                    {['buy', 'rent', 'sell'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                                                activeTab === tab
                                                    ? 'bg-white text-indigo-600 shadow-sm'
                                                    : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                <form onSubmit={handleSearch} className="space-y-4">
                                    {/* Location Input */}
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Enter location..."
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                                        />
                                    </div>

                                    {/* Property Type */}
                                    <div className="grid grid-cols-3 gap-2">
                                        {propertyTypes.map((type) => (
                                            <button
                                                key={type.value}
                                                type="button"
                                                onClick={() => setPropertyType(type.value === propertyType ? '' : type.value)}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                                                    propertyType === type.value
                                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600'
                                                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                                }`}
                                            >
                                                <span className="text-lg">{type.icon}</span>
                                                <span className="text-xs font-medium">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Price Range */}
                                    <select
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                                    >
                                        <option value="">Select price range</option>
                                        {priceRanges.map((range) => (
                                            <option key={range.value} value={range.value}>
                                                {range.label}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Search Button */}
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <FaSearch />
                                        Search Properties
                                    </motion.button>
                                </form>

                                {/* Quick Features */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 mb-3 font-medium">Popular features:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { icon: <FaBed />, label: '3+ Beds' },
                                            { icon: <FaBath />, label: '2+ Baths' },
                                            { icon: <FaCar />, label: 'Parking' }
                                        ].map((feature, index) => (
                                            <button
                                                key={index}
                                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors duration-200"
                                            >
                                                {feature.icon}
                                                {feature.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
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