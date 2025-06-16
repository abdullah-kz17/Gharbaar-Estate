express validator
express rate limit
redis
multipart/formdata
18adf28184244209955df2e16414b9aa
role missing
user should not be able to update its role in update profile
update property
rbac
clsx
framer motion
place holders(skelton)
prime react
customized fields
// real time chat
bg-gradient-to-r from-indigo-600 to-purple-600


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
FaChevronDown,
FaSearch,
FaMapMarkerAlt,
FaHome,
FaBuilding,
FaWarehouse,
FaBed,
FaBath,
FaCar,
FaPlay,
FaFilter,
FaExpand,
FaWifi,
FaSwimmingPool,
FaParking,
FaLeaf,
FaShieldAlt,
FaDollarSign,
FaRulerCombined,
FaStar,
FaFire,
FaMapPin
} from 'react-icons/fa';

export default function EnhancedHero({ isLoggedIn, user }) {
const [scrollY, setScrollY] = useState(0);
const [searchQuery, setSearchQuery] = useState('');
const [propertyType, setPropertyType] = useState('');
const [location, setLocation] = useState('');
const [priceRange, setPriceRange] = useState('');
const [area, setArea] = useState('');
const [bedrooms, setBedrooms] = useState('');
const [bathrooms, setBathrooms] = useState('');
const [activeTab, setActiveTab] = useState('buy');
const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
const [selectedAmenities, setSelectedAmenities] = useState([]);
const [selectedFeatures, setSelectedFeatures] = useState([]);

    // Enhanced statistics data
    const stats = [
        { number: '15,000+', label: 'Properties Listed', icon: <FaHome />, color: 'from-blue-400 to-blue-600' },
        { number: '8,500+', label: 'Happy Clients', icon: <FaStar />, color: 'from-yellow-400 to-yellow-600' },
        { number: '300+', label: 'Expert Agents', icon: <FaShieldAlt />, color: 'from-green-400 to-green-600' },
        { number: '75+', label: 'Cities Covered', icon: <FaMapPin />, color: 'from-purple-400 to-purple-600' }
    ];

    // Property types based on your model
    const propertyTypes = [
        { value: 'house', label: 'House', icon: <FaHome />, description: 'Single family homes' },
        { value: 'apartment', label: 'Apartment', icon: <FaBuilding />, description: 'Modern apartments' },
        { value: 'commercial', label: 'Commercial', icon: <FaWarehouse />, description: 'Business properties' }
    ];

    // Pakistani real estate areas
    const areaOptions = [
        { value: '3-marla', label: '3 Marla' },
        { value: '5-marla', label: '5 Marla' },
        { value: '7-marla', label: '7 Marla' },
        { value: '10-marla', label: '10 Marla' },
        { value: '1-kanal', label: '1 Kanal' },
        { value: '2-kanal', label: '2 Kanal' }
    ];

    // Enhanced price ranges
    const priceRanges = [
        { value: '0-2000000', label: 'Under 20 Lakh' },
        { value: '2000000-5000000', label: '20L - 50L' },
        { value: '5000000-10000000', label: '50L - 1 Crore' },
        { value: '10000000-25000000', label: '1Cr - 2.5Cr' },
        { value: '25000000+', label: 'Above 2.5Cr' }
    ];

    // Amenities from your model
    const amenities = [
        { value: 'gas', label: 'Gas', icon: <FaFire /> },
        { value: 'electricity', label: 'Electricity', icon: <FaWifi /> },
        { value: 'water-supply', label: 'Water Supply', icon: <FaLeaf /> },
        { value: 'internet', label: 'Internet', icon: <FaWifi /> },
        { value: 'security', label: 'Security', icon: <FaShieldAlt /> },
        { value: 'parking', label: 'Parking', icon: <FaParking /> }
    ];

    // Features from your model
    const features = [
        { value: 'garage', label: 'Garage', icon: <FaCar /> },
        { value: 'balcony', label: 'Balcony', icon: <FaExpand /> },
        { value: 'garden', label: 'Garden', icon: <FaLeaf /> },
        { value: 'swimming-pool', label: 'Pool', icon: <FaSwimmingPool /> }
    ];

    // Handle search with enhanced parameters
    const handleSearch = (e) => {
        e.preventDefault();
        const searchParams = {
            query: searchQuery,
            propertyType,
            location,
            priceRange,
            area,
            bedrooms,
            bathrooms,
            amenities: selectedAmenities,
            features: selectedFeatures,
            type: activeTab
        };
        console.log('Enhanced Search:', searchParams);
        // Implement search logic here
    };

    // Toggle amenity selection
    const toggleAmenity = (amenity) => {
        setSelectedAmenities(prev =>
            prev.includes(amenity)
                ? prev.filter(a => a !== amenity)
                : [...prev, amenity]
        );
    };

    // Toggle feature selection
    const toggleFeature = (feature) => {
        setSelectedFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    // Scroll handler for parallax
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to services
    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Enhanced Background with Multiple Layers */}
            <div className="absolute inset-0 z-0">
                {/* Primary Background */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')",
                        transform: `translateY(${scrollY * 0.2}px)`,
                    }}
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-purple-900/70 to-slate-900/90"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-slate-900/60"></div>

                {/* Animated Mesh Background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
                </div>
            </div>

            {/* Enhanced Floating Elements */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-xl"
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-32 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-xl"
                    animate={{
                        y: [0, 20, 0],
                        x: [0, 15, 0],
                        rotate: [0, -90, 0]
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-xl"
                    animate={{
                        y: [0, -15, 0],
                        x: [0, 10, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-20 flex-1 flex flex-col justify-center px-4 py-20">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Enhanced Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="text-white"
                        >
                            {/* Welcome Message */}
                            {user?.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-6"
                                >
                                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 rounded-full backdrop-blur-lg border border-white/20 shadow-2xl">
                                        <span className="text-2xl">👋</span>
                                        <span className="font-medium">Welcome back, {user.name}!</span>
                                    </div>
                                </motion.div>
                            )}

                            {/* Main Heading */}
                            <motion.h1
                                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 1 }}
                            >
                                Find Your
                                <motion.span
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                                    animate={{
                                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 3,
                                        ease: 'linear'
                                    }}
                                    style={{
                                        backgroundSize: '200% 200%'
                                    }}
                                >
                                    Dream Home
                                </motion.span>
                                Today
                            </motion.h1>

                            {/* Enhanced Description */}
                            <motion.p
                                className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed max-w-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                Discover premium properties across Pakistan with our AI-powered platform.
                                <span className="block mt-2 text-lg text-blue-300">
                                    Buy, sell, or rent with confidence and expert guidance from verified agents.
                                </span>
                            </motion.p>

                            {/* Enhanced CTA Buttons */}
                            <motion.div
                                className="flex flex-wrap gap-6 mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to={isLoggedIn ? '/properties' : '/register'}
                                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 transform hover:shadow-purple-500/30 border border-white/20 backdrop-blur-sm"
                                    >
                                        <FaSearch className="text-lg" />
                                        {isLoggedIn ? 'Browse Properties' : 'Start Your Search'}
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <button className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-xl border border-white/30 text-white font-bold px-10 py-5 rounded-2xl hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-white/20">
                                        <FaPlay className="text-lg" />
                                        Watch Demo
                                    </button>
                                </motion.div>
                            </motion.div>

                            {/* Enhanced Statistics */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                                className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1 + index * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="text-center lg:text-left group"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                                {stat.icon}
                                            </div>
                                            <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200">
                                                {stat.number}
                                            </div>
                                        </div>
                                        <div className="text-lg font-medium text-gray-200">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Enhanced Right Content: Search Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
                        >
                            <form onSubmit={handleSearch} className="space-y-6">
                                {/* Tabs: Buy / Rent */}
                                <div className="flex gap-4 mb-4">
                                    <button
                                        type="button"
                                        className={`px-6 py-2 rounded-full font-bold transition-all ${
                                            activeTab === 'buy'
                                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg'
                                                : 'bg-white/20 text-gray-300 hover:bg-white/30'
                                        }`}
                                        onClick={() => setActiveTab('buy')}
                                    >
                                        Buy
                                    </button>
                                    <button
                                        type="button"
                                        className={`px-6 py-2 rounded-full font-bold transition-all ${
                                            activeTab === 'rent'
                                                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg'
                                                : 'bg-white/20 text-gray-300 hover:bg-white/30'
                                        }`}
                                        onClick={() => setActiveTab('rent')}
                                    >
                                        Rent
                                    </button>
                                </div>

                                {/* Search Query */}
                                <div className="flex items-center bg-white/20 rounded-xl px-4 py-3">
                                    <FaSearch className="text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        placeholder="Search by keyword or society"
                                        className="bg-transparent outline-none w-full text-gray-200 placeholder-gray-400"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Property Type */}
                                <div>
                                    <label className="block text-gray-200 mb-2 font-medium">Property Type</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {propertyTypes.map(type => (
                                            <button
                                                type="button"
                                                key={type.value}
                                                className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                                                    propertyType === type.value
                                                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white border-transparent'
                                                        : 'bg-white/10 text-gray-200 border-white/20 hover:bg-white/20'
                                                }`}
                                                onClick={() => setPropertyType(type.value)}
                                            >
                                                <span className="text-2xl mb-1">{type.icon}</span>
                                                <span className="text-sm">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center bg-white/20 rounded-xl px-4 py-3">
                                    <FaMapMarkerAlt className="text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        placeholder="Enter city or area"
                                        className="bg-transparent outline-none w-full text-gray-200 placeholder-gray-400"
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                    />
                                </div>

                                {/* Area and Price Range */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-200 mb-2 font-medium">Area</label>
                                        <select
                                            className="w-full bg-white/20 text-gray-200 rounded-xl px-3 py-2 outline-none"
                                            value={area}
                                            onChange={e => setArea(e.target.value)}
                                        >
                                            <option value="">Select Area</option>
                                            {areaOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-200 mb-2 font-medium">Price Range</label>
                                        <select
                                            className="w-full bg-white/20 text-gray-200 rounded-xl px-3 py-2 outline-none"
                                            value={priceRange}
                                            onChange={e => setPriceRange(e.target.value)}
                                        >
                                            <option value="">Select Price</option>
                                            {priceRanges.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Bedrooms and Bathrooms */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-200 mb-2 font-medium">Bedrooms</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full bg-white/20 text-gray-200 rounded-xl px-3 py-2 outline-none"
                                            placeholder="Any"
                                            value={bedrooms}
                                            onChange={e => setBedrooms(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-200 mb-2 font-medium">Bathrooms</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="w-full bg-white/20 text-gray-200 rounded-xl px-3 py-2 outline-none"
                                            placeholder="Any"
                                            value={bathrooms}
                                            onChange={e => setBathrooms(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Advanced Search Toggle */}
                                <button
                                    type="button"
                                    className="flex items-center gap-2 text-blue-300 hover:text-blue-400 font-medium mt-2"
                                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                                >
                                    <FaFilter />
                                    {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
                                    <FaChevronDown className={`transition-transform ${showAdvancedSearch ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Advanced Search Section */}
                                {showAdvancedSearch && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        transition={{ duration: 0.4 }}
                                        className="mt-4 space-y-4"
                                    >
                                        {/* Amenities */}
                                        <div>
                                            <label className="block text-gray-200 mb-2 font-medium">Amenities</label>
                                            <div className="flex flex-wrap gap-2">
                                                {amenities.map(a => (
                                                    <button
                                                        type="button"
                                                        key={a.value}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all ${
                                                            selectedAmenities.includes(a.value)
                                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                                                                : 'bg-white/10 text-gray-200 border-white/20 hover:bg-white/20'
                                                        }`}
                                                        onClick={() => toggleAmenity(a.value)}
                                                    >
                                                        {a.icon}
                                                        {a.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Features */}
                                        <div>
                                            <label className="block text-gray-200 mb-2 font-medium">Features</label>
                                            <div className="flex flex-wrap gap-2">
                                                {features.map(f => (
                                                    <button
                                                        type="button"
                                                        key={f.value}
                                                        className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all ${
                                                            selectedFeatures.includes(f.value)
                                                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-transparent'
                                                                : 'bg-white/10 text-gray-200 border-white/20 hover:bg-white/20'
                                                        }`}
                                                        onClick={() => toggleFeature(f.value)}
                                                    >
                                                        {f.icon}
                                                        {f.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 mt-4"
                                >
                                    <FaSearch />
                                    Search Properties
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Down Button */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30">
                <button
                    onClick={scrollToServices}
                    className="flex flex-col items-center text-blue-200 hover:text-blue-400 animate-bounce"
                >
                    <FaChevronDown className="text-3xl" />
                    <span className="mt-1 text-sm font-medium">Explore Services</span>
                </button>
            </div>
        </section>
    );
}

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
FaHome, FaList, FaUser, FaSignOutAlt, FaSignInAlt,
FaUserPlus, FaPlusCircle, FaBars, FaTimes,
FaTasks, FaUserTie, FaChevronDown, FaDashcube,
FaBell, FaSearch, FaCog
} from 'react-icons/fa';
import ThemeToggle from "../common/ThemeToggle.jsx";
import { GiPriceTag } from "react-icons/gi";

const Header = () => {
const { isLoggedIn, logout, user } = useAuth();
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
const [scrolled, setScrolled] = useState(false);
const dropdownRef = useRef(null);
const userMenuRef = useRef(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const toggleUserMenu = () => setIsUserMenuOpen(prev => !prev);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isAdmin = user?.role === 'admin';
    const isProvider = user?.isServiceProvider && user?.serviceProviderProfile;

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled
                ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
                : 'bg-white dark:bg-gray-900 shadow-md'
        }`}>
            {/* Animated gradient line */}
            <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <img
                                    src="/logo2.png"
                                    alt="Logo"
                                    className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                                    Gharbaar Estate
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Premium Properties</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        <NavItem to="/" label="Home" icon={<FaHome />} />
                        <NavItem to="/properties" label="Properties" icon={<FaList />} />
                        <NavItem to="/services" label="Services" icon={<FaTasks />} />

                        {isLoggedIn && (
                            <NavItem
                                to={isAdmin ? "/admin-dashboard" : "/user-dashboard"}
                                label="Dashboard"
                                icon={<FaDashcube />}
                            />
                        )}

                        {/* More Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
                                aria-expanded={isDropdownOpen}
                                aria-haspopup="true"
                            >
                                <span>More</span>
                                <FaChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Enhanced Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-2 z-50 animate-fade-in-up">
                                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Quick Links</p>
                                    </div>
                                    <DropdownLink to="/about" label="About Us" description="Learn more about us" />
                                    <DropdownLink to="/contact" label="Contact Us" description="Get in touch" />
                                    <DropdownLink to="/pricing-plan" label="Pricing Plan" description="View our plans" />

                                    {isLoggedIn && (
                                        <>
                                            <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                                            <DropdownLink to="/profile" label="My Profile" description="Manage your account" />
                                            {isProvider && <DropdownLink to="/service-provider/me" label="Service Profile" description="Your service details" />}
                                            {!user?.isServiceProvider && <DropdownLink to="/add-service" label="Become a Provider" description="Start offering services" />}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-3">
                        {/* Search Button (Desktop) */}
                        <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
                            <FaSearch />
                        </button>

                        {isLoggedIn ? (
                            <>
                                {/* Notifications */}
                                <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 relative">
                                    <FaBell />
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </button>

                                {/* Add Property Button */}
                                {!isAdmin && (
                                    <Link
                                        to="/add-property"
                                        className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        <FaPlusCircle />
                                        <span className="font-medium">Add Property</span>
                                    </Link>
                                )}

                                {/* User Menu */}
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        onClick={toggleUserMenu}
                                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                                        aria-expanded={isUserMenuOpen}
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <FaChevronDown className={`hidden md:block text-sm transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl py-2 z-50 animate-fade-in-up">
                                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                                <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                                            </div>
                                            <UserMenuItem to="/profile" icon={<FaUser />} label="Profile" />
                                            <UserMenuItem to="/settings" icon={<FaCog />} label="Settings" />
                                            <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                                            >
                                                <FaSignOutAlt />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 font-medium"
                                >
                                    <FaSignInAlt />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                                >
                                    <FaUserPlus />
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <div className="hidden md:block">
                            <ThemeToggle />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Enhanced Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
                    <div className="px-4 py-6 space-y-4 max-h-96 overflow-y-auto">
                        {/* Search Bar Mobile */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search properties..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>

                        {/* Navigation Links */}
                        <div className="space-y-2">
                            <MobileLink to="/" label="Home" icon={<FaHome />} />
                            <MobileLink to="/properties" label="Properties" icon={<FaList />} />
                            <MobileLink to="/services" label="Services" icon={<FaTasks />} />
                            <MobileLink to="/about" label="About Us" icon={<FaUser />} />
                            <MobileLink to="/pricing-plan" label="Pricing Plan" icon={<GiPriceTag />} />
                        </div>

                        {isLoggedIn ? (
                            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <MobileLink to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} label="Dashboard" icon={<FaDashcube />} />
                                <MobileLink to="/profile" label="My Profile" icon={<FaUser />} />

                                {isProvider && <MobileLink to="/service-provider/me" label="Service Profile" icon={<FaUserTie />} />}
                                {!user?.isServiceProvider && !isAdmin && (
                                    <MobileLink to="/add-service" label="Become a Provider" icon={<FaPlusCircle />} />
                                )}

                                {!isAdmin && (
                                    <Link
                                        to="/add-property"
                                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                                    >
                                        <FaPlusCircle />
                                        <span className="font-medium">Add Property</span>
                                    </Link>
                                )}

                                <button
                                    onClick={logout}
                                    className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 w-full"
                                >
                                    <FaSignOutAlt />
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                                >
                                    <FaSignInAlt />
                                    <span className="font-medium">Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                                >
                                    <FaUserPlus />
                                    <span className="font-medium">Register</span>
                                </Link>
                            </div>
                        )}

                        {/* Theme Toggle Mobile */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

// Enhanced Desktop Navigation Item
const NavItem = ({ to, label, icon }) => (
<NavLink
to={to}
className={({ isActive }) =>
`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative ${
    isActive
        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm'
        : 'text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800'
}`
}
>
{({ isActive }) => (
<>
{icon}
<span>{label}</span>
{isActive && (
<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></div>
)}
</>
)}
</NavLink>
);

// Enhanced Dropdown Link
const DropdownLink = ({ to, label, description }) => (
<Link
to={to}
className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
>
<div className="flex flex-col">
<span className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
{label}
</span>
{description && (
<span className="text-sm text-gray-500 dark:text-gray-400">
{description}
</span>
)}
</div>
</Link>
);

// User Menu Item
const UserMenuItem = ({ to, icon, label }) => (
<Link
to={to}
className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
>
{icon}
<span>{label}</span>
</Link>
);

// Enhanced Mobile Link
const MobileLink = ({ to, label, icon }) => (
<NavLink
to={to}
className={({ isActive }) =>
`flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 ${
    isActive
        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 shadow-sm'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
}`
}
>
{icon}
<span>{label}</span>
</NavLink>
);

export default Header;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero({ isLoggedIn, user }) {
const [scrollY, setScrollY] = useState(0);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Handle smooth scrolling to the services section
    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Update scrollY value for parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track mouse movement for interactive effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: "🏠",
            title: "Smart Listings",
            desc: "AI-powered property search",
            color: "from-blue-500 to-indigo-600"
        },
        {
            icon: "🔧",
            title: "Renovation Hub",
            desc: "Connect with trusted contractors",
            color: "from-purple-500 to-pink-600"
        },
        {
            icon: "🤖",
            title: "AI Analysis",
            desc: "Automated renovation assessment",
            color: "from-indigo-500 to-purple-600"
        },
        {
            icon: "💬",
            title: "Smart Search",
            desc: "Natural language property finder",
            color: "from-pink-500 to-red-600"
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0">
                {/* Animated Gradient Mesh */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)`,
                        transition: 'background 0.3s ease'
                    }}
                />

                {/* Floating Geometric Shapes */}
                <motion.div
                    className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-10"
                    style={{
                        background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #ec4899, #6366f1)',
                        filter: 'blur(2px)'
                    }}
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <motion.div
                    className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-8"
                    style={{
                        background: 'conic-gradient(from 180deg, #8b5cf6, #6366f1, #3b82f6, #8b5cf6)',
                        filter: 'blur(3px)'
                    }}
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.3, 1],
                        x: [0, -40, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        transform: `translateY(${scrollY * 0.1}px)`
                    }}
                />

                {/* Floating Particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 4 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="max-w-7xl mx-auto text-center">

                    {/* Welcome Badge */}
                    <AnimatePresence>
                        {user?.username && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                                    <span className="text-white/90 font-medium">Welcome back, {user.username}!</span>
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <motion.h1
                            className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #e0e7ff 25%, #c7d2fe 50%, #a5b4fc 75%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            <motion.span
                                className="block mb-4"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                Reimagine
                            </motion.span>
                            <motion.span
                                className="block text-transparent bg-clip-text"
                                style={{
                                    background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899, #f59e0b, #6366f1)',
                                    backgroundSize: '300% 300%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                                animate={{
                                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                            >
                                Your Space
                            </motion.span>
                        </motion.h1>
                    </motion.div>

                    {/* Enhanced Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-12"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-4">
                            Transform property buying, selling & renovation with
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300"> AI-powered intelligence</span>
                        </p>
                        <p className="text-lg md:text-xl text-indigo-200 font-medium">
                            Just describe your dream home - our AI will find it and assess renovation needs instantly
                        </p>
                    </motion.div>

                    {/* Feature Cards Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                                    {/* Hover Gradient Background */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${feature.color}`} />

                                    <div className="relative z-10">
                                        <div className="text-3xl mb-3">{feature.icon}</div>
                                        <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                                        <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >
                        <motion.button
                            className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-indigo-500/25 overflow-hidden"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => isLoggedIn ? window.location.href = '/properties' : window.location.href = '/register'}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10 flex items-center gap-3">
                                <span>{isLoggedIn ? 'Explore Properties' : 'Start Your Journey'}</span>
                                <i className="fas fa-rocket group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </motion.button>

                        <motion.button
                            className="group px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={scrollToServices}
                        >
                            <div className="flex items-center gap-3">
                                <span>Discover AI Features</span>
                                <i className="fas fa-brain group-hover:text-indigo-300 transition-colors duration-300" />
                            </div>
                        </motion.button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="text-white/40 text-sm font-medium tracking-widest uppercase">
                            Scroll to explore more
                        </div>
                        <motion.button
                            className="p-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            whileHover={{ scale: 1.1 }}
                            onClick={scrollToServices}
                        >
                            <i className="fas fa-chevron-down text-xl" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Hero({ isLoggedIn, user }) {
const [scrollY, setScrollY] = useState(0);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Handle smooth scrolling to the services section
    const scrollToServices = () => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Update scrollY value for parallax effect
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track mouse movement for interactive effects
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const features = [
        {
            icon: "🏠",
            title: "Smart Listings",
            desc: "AI-powered property search",
            color: "from-indigo-500 to-indigo-700"
        },
        {
            icon: "🔧",
            title: "Renovation Hub",
            desc: "Connect with trusted contractors",
            color: "from-purple-500 to-purple-700"
        },
        {
            icon: "🤖",
            title: "AI Analysis",
            desc: "Automated renovation assessment",
            color: "from-indigo-600 to-purple-600"
        },
        {
            icon: "💬",
            title: "Smart Search",
            desc: "Natural language property finder",
            color: "from-purple-600 to-indigo-600"
        }
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-purple-800">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0">
                {/* Animated Gradient Mesh */}
                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(129, 140, 248, 0.4) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 60%)`,
                        transition: 'background 0.3s ease'
                    }}
                />

                {/* Floating Geometric Shapes */}
                <motion.div
                    className="absolute top-20 right-20 w-80 h-80 rounded-full opacity-15"
                    style={{
                        background: 'conic-gradient(from 0deg, #4f46e5, #7c3aed, #c084fc, #a855f7, #4f46e5)',
                        filter: 'blur(1px)'
                    }}
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.15, 1],
                        x: [0, 40, 0],
                        y: [0, -25, 0]
                    }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                <motion.div
                    className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-12"
                    style={{
                        background: 'conic-gradient(from 180deg, #7c3aed, #4f46e5, #6366f1, #8b5cf6, #7c3aed)',
                        filter: 'blur(2px)'
                    }}
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.25, 1],
                        x: [0, -35, 0],
                        y: [0, 35, 0]
                    }}
                    transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Additional Layered Gradients */}
                <motion.div
                    className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full opacity-8"
                    style={{
                        background: 'radial-gradient(circle, rgba(129, 140, 248, 0.3) 0%, rgba(196, 181, 253, 0.1) 50%, transparent 80%)',
                        filter: 'blur(3px)'
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 20, 0],
                        y: [0, -15, 0],
                        opacity: [0.08, 0.15, 0.08]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Grid Pattern Overlay */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        transform: `translateY(${scrollY * 0.1}px)`
                    }}
                />

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full opacity-40"
                        style={{
                            left: `${15 + i * 12}%`,
                            top: `${25 + (i % 4) * 18}%`,
                            background: i % 2 === 0
                                ? 'linear-gradient(45deg, #818cf8, #c4b5fd)'
                                : 'linear-gradient(45deg, #a78bfa, #ddd6fe)'
                        }}
                        animate={{
                            y: [0, -80, 0],
                            opacity: [0.4, 0.8, 0.4],
                            scale: [1, 1.8, 1]
                        }}
                        transition={{
                            duration: 5 + i * 0.8,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="max-w-7xl mx-auto text-center">

                    {/* Welcome Badge */}
                    <AnimatePresence>
                        {user?.username && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-indigo-900/20 backdrop-blur-xl border border-indigo-300/20 shadow-2xl shadow-indigo-500/10"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50" />
                                    <span className="text-indigo-100 font-medium">Welcome back, {user.username}!</span>
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Hero Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <motion.h1
                            className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6"
                            style={{
                                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 15%, #cbd5e1 30%, #94a3b8 45%, #64748b 60%, #475569 75%, #334155 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 0 30px rgba(129, 140, 248, 0.3))'
                            }}
                        >
                            <motion.span
                                className="block mb-4"
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                Reimagine
                            </motion.span>
                            <motion.span
                                className="block text-transparent bg-clip-text"
                                style={{
                                    background: 'linear-gradient(45deg, #4f46e5, #7c3aed, #a855f7, #c084fc, #ddd6fe, #4f46e5)',
                                    backgroundSize: '300% 300%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 0 40px rgba(168, 85, 247, 0.4))'
                                }}
                                animate={{
                                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                Your Space
                            </motion.span>
                        </motion.h1>
                    </motion.div>

                    {/* Enhanced Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mb-12"
                    >
                        <p className="text-xl md:text-2xl lg:text-3xl text-indigo-100 max-w-4xl mx-auto leading-relaxed font-light mb-4">
                            Transform property buying, selling & renovation with
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200"> AI-powered intelligence</span>
                        </p>
                        <p className="text-lg md:text-xl text-indigo-300 font-medium">
                            Just describe your dream home - our AI will find it and assess renovation needs instantly
                        </p>
                    </motion.div>

                    {/* Feature Cards Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-5xl mx-auto"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                whileHover={{ scale: 1.05, y: -5 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="relative p-6 rounded-2xl bg-indigo-900/10 backdrop-blur-xl border border-indigo-300/15 hover:border-indigo-300/30 hover:bg-indigo-800/15 transition-all duration-300 overflow-hidden shadow-lg shadow-indigo-500/5">
                                    {/* Hover Gradient Background */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-300 bg-gradient-to-br ${feature.color}`} />

                                    <div className="relative z-10">
                                        <div className="text-3xl mb-3 filter drop-shadow-lg">{feature.icon}</div>
                                        <h3 className="text-indigo-100 font-bold text-lg mb-2 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                                        <p className="text-indigo-200/70 text-sm group-hover:text-indigo-100/90 transition-colors duration-300">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                    >
                        <motion.button
                            className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/30 overflow-hidden border border-indigo-400/20"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => isLoggedIn ? window.location.href = '/properties' : window.location.href = '/register'}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10 flex items-center gap-3">
                                <span>{isLoggedIn ? 'Explore Properties' : 'Start Your Journey'}</span>
                                <i className="fas fa-rocket group-hover:rotate-12 transition-transform duration-300" />
                            </div>
                        </motion.button>

                        <motion.button
                            className="group px-10 py-5 bg-indigo-900/20 backdrop-blur-xl border-2 border-indigo-300/30 text-indigo-100 font-bold text-lg rounded-2xl hover:bg-indigo-800/30 hover:border-indigo-300/50 hover:text-white transition-all duration-300 shadow-lg shadow-indigo-500/10"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={scrollToServices}
                        >
                            <div className="flex items-center gap-3">
                                <span>Discover AI Features</span>
                                <i className="fas fa-brain group-hover:text-purple-300 transition-colors duration-300" />
                            </div>
                        </motion.button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="text-indigo-200/60 text-sm font-medium tracking-widest uppercase">
                            Scroll to explore more
                        </div>
                        <motion.button
                            className="p-4 rounded-full bg-indigo-900/20 backdrop-blur-xl border border-indigo-300/20 text-indigo-200/70 hover:text-indigo-100 hover:bg-indigo-800/30 hover:border-indigo-300/40 transition-all duration-300 shadow-lg shadow-indigo-500/10"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            whileHover={{ scale: 1.1 }}
                            onClick={scrollToServices}
                        >
                            <i className="fas fa-chevron-down text-xl" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
        </div>
    );
}

const teamMembers = [
{
name: "Abdullah Khan",
role: "Founder & CEO",
bio: "With over 10 years in real estate tech, Abdullah leads our vision to revolutionize the housing market through AI innovation.",
image: "/api/placeholder/300/300",
social: {
linkedin: "#",
twitter: "#",
instagram: "#"
}
},
{
name: "Bilawal Hassan",
role: "CTO",
bio: "Bilawal brings extensive expertise in AI and machine learning to create our intelligent property matching algorithms.",
image: "/api/placeholder/300/300",
social: {
linkedin: "#",
twitter: "#",
instagram: "#"
}
},
{
name: "Husnain Ali",
role: "Head of Design",
bio: "A visionary designer focused on creating intuitive, beautiful interfaces for our renovation simulations and virtual tours.",
image: "/api/placeholder/300/300",
social: {
linkedin: "#",
twitter: "#",
instagram: "#"
}
},
{
name: "Muhammad Haris",
role: "Operations Director",
bio: "Muhammad ensures seamless coordination between our platform, contractors, and clients for exceptional service delivery.",
image: "/api/placeholder/300/300",
social: {
linkedin: "#",
twitter: "#",
instagram: "#"
}
},
{
name: "Ali Husnain",
role: "Customer Success Manager",
bio: "Dedicated to client satisfaction, Ali leads our support team in helping customers navigate their real estate journey.",
image: "/api/placeholder/300/300",
social: {
linkedin: "#",
twitter: "#",
instagram: "#"
}
}
];

    

const Property = require("../models/propertyModel");

// Helper to check ownership or admin rights
const isAuthorized = (user, property) => {
return user.role === "admin" || property.createdBy.equals(user._id);
};

// GET all properties of logged-in user
const getUserProperties = async (req, res) => {
try {
const userId = req.user._id;
const properties = await Property.find({ createdBy: userId });
res.json({ success: true, properties });
} catch (err) {
res.status(500).json({ success: false, message: "Server error", error: err.message });
}
};

// GET a single user property by id
const getUserPropertyById = async (req, res) => {
try {
const property = await Property.findById(req.params.id);
if (!property) return res.status(404).json({ success: false, message: "Property not found" });

        if (!property.createdBy.equals(req.user._id) && req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        res.json({ success: true, property });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// UPDATE user's property
const updateUserProperty = async (req, res) => {
try {
const property = await Property.findById(req.params.id);
if (!property) return res.status(404).json({ success: false, message: "Property not found" });

        if (!property.createdBy.equals(req.user._id)) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        Object.assign(property, req.body);
        await property.save();

        res.json({ success: true, message: "Property updated", property });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// DELETE user's property
const deleteUserProperty = async (req, res) => {
try {
const property = await Property.findById(req.params.id);
if (!property) return res.status(404).json({ success: false, message: "Property not found" });

        if (!property.createdBy.equals(req.user._id)) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        await property.remove();
        res.json({ success: true, message: "Property deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// ADMIN: Approve property
const approveProperty = async (req, res) => {
try {
if (req.user.role !== "admin") {
return res.status(403).json({ success: false, message: "Admin only" });
}

        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ success: false, message: "Property not found" });

        property.status = "approved";
        property.isApproved = true;
        property.isBanned = false;
        await property.save();

        res.json({ success: true, message: "Property approved", property });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// ADMIN: Ban property
const banProperty = async (req, res) => {
try {
if (req.user.role !== "admin") {
return res.status(403).json({ success: false, message: "Admin only" });
}

        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ success: false, message: "Property not found" });

        property.status = "banned";
        property.isBanned = true;
        property.isApproved = false;
        await property.save();

        res.json({ success: true, message: "Property banned", property });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// ADMIN: Feature property
const featureProperty = async (req, res) => {
try {
if (req.user.role !== "admin") {
return res.status(403).json({ success: false, message: "Admin only" });
}

        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ success: false, message: "Property not found" });

        property.isFeatured = true;
        property.status = "featured";
        await property.save();

        res.json({ success: true, message: "Property marked as featured", property });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

module.exports = {
getUserProperties,
getUserPropertyById,
updateUserProperty,
deleteUserProperty,
approveProperty,
banProperty,
featureProperty,
};

function parsePrompt(prompt) {
const filters = {};

// Area (Marla/Kanal)
const areaMatch = prompt.match(/(\d+)\s*(marla|kanal)/i);
if (areaMatch) {
filters.area = areaMatch[0].toLowerCase(); // e.g., "5 marla"
}

// Rooms (beds)
const bedsMatch = prompt.match(/(\d+)\s*(rooms|beds)/i);
if (bedsMatch) {
filters['rooms.beds'] = parseInt(bedsMatch[1], 10);
}

// Baths
const bathsMatch = prompt.match(/(\d+)\s*baths?/i);
if (bathsMatch) {
filters['rooms.baths'] = parseInt(bathsMatch[1], 10);
}

// Price - under X
const priceUnderMatch = prompt.match(/under\s*(\d+)\s*(crore|lakh)/i);
if (priceUnderMatch) {
const num = parseInt(priceUnderMatch[1], 10);
const multiplier = priceUnderMatch[2].toLowerCase() === 'crore' ? 10000000 : 100000;
filters.price = { $lte: num * multiplier };
}

// Price - between X and Y
const priceBetweenMatch = prompt.match(/between\s*(\d+)\s*(crore|lakh)\s*and\s*(\d+)\s*(crore|lakh)/i);
if (priceBetweenMatch) {
const num1 = parseInt(priceBetweenMatch[1], 10);
const unit1 = priceBetweenMatch[2].toLowerCase();
const num2 = parseInt(priceBetweenMatch[3], 10);
const unit2 = priceBetweenMatch[4].toLowerCase();
const multiplier1 = unit1 === 'crore' ? 10000000 : 100000;
const multiplier2 = unit2 === 'crore' ? 10000000 : 100000;
filters.price = { $gte: num1 * multiplier1, $lte: num2 * multiplier2 };
}

// Location (simple match on address)
const locationMatch = prompt.match(/in\s+([a-z\s]+)/i);
if (locationMatch) {
filters['location.address'] = { $regex: locationMatch[1].trim(), $options: 'i' };
}

return filters;
}

const express = require('express');
const router = express.Router();
const Property = require('../models/propertyModel');

router.get('/search', async (req, res) => {
const { prompt } = req.query;

if (!prompt) {
return res.status(400).json({ success: false, message: "Prompt query is required." });
}

try {
const filters = parsePrompt(prompt);

    // You can add defaults or pagination as needed
    const properties = await Property.find(filters).limit(50);

    res.json({ success: true, count: properties.length, properties });
} catch (err) {
res.status(500).json({ success: false, message: 'Search failed', error: err.message });
}
});

module.exports = router;


