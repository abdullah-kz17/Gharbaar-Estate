import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    FaHome, FaList, FaUser, FaSignOutAlt, FaSignInAlt,
    FaUserPlus, FaPlusCircle, FaBars, FaTimes,
    FaTasks, FaUserTie, FaChevronDown, FaDashcube
} from 'react-icons/fa';
import ThemeToggle from "../common/ThemeToggle.jsx";
import { GiPriceTag } from "react-icons/gi";
import GharbaarLogo from '../common/GharbaarLogo.jsx';

const Header = () => {
    const { isLoggedIn, logout, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const isAdmin = user?.role === 'admin';
    const isProvider = user?.isServiceProvider && user?.serviceProviderProfile;

    return (
        <>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-1 w-full"></div>
        <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-all px-10">

            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <GharbaarLogo />
                </div>


                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    <NavItem to="/" label="Home" icon={<FaHome />} />
                    <NavItem to="/properties" label="Properties" icon={<FaList />} />
                    <NavItem to="/services" label="Services" icon={<FaTasks />} />
                    <NavItem to="/blogs" label="Blogs" icon={<FaTasks />} />

                    {isLoggedIn && (
                        <NavItem
                            to={isAdmin ? "/admin-dashboard" : "/user-dashboard"}
                            label="Dashboard"
                            icon={<FaDashcube />}
                        />
                    )}

                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-100 hover:text-indigo-600 transition font-medium"
                        >
                            <span>More</span>
                            <FaChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                                <DropdownLink to="/about" label="About Us" />
                                <DropdownLink to="/contact" label="Contact Us" />
                                <DropdownLink to="/pricing-plan" label="Pricing Plan" />
                                {isLoggedIn && (
                                    <>
                                        <DropdownLink to="/profile" label="My Profile" />
                                        {isProvider && <DropdownLink to="/service-provider/me" label="Service Profile" />}
                                        {!user?.isServiceProvider && <DropdownLink to="/add-service" label="Become a Provider" />}
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    {isLoggedIn ? (
                        <div className="flex items-center space-x-4">
                            {!isAdmin && (
                                <Link
                                    to="/add-property"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white flex items-center gap-2 px-4 py-2 rounded-md transition"
                                >
                                    <FaPlusCircle />
                                    <span>Add Property</span>
                                </Link>
                            )}
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 text-gray-700 dark:text-white hover:text-red-600 transition"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                            <ThemeToggle />
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <NavItem to="/login" label="Login" icon={<FaSignInAlt />} />
                            <Link to="/register" className="btn-primary flex items-center gap-2">
                                <FaUserPlus />
                                <span>Register</span>
                            </Link>
                        </div>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button onClick={toggleMobileMenu} className="md:hidden text-gray-700 dark:text-white">
                    {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 shadow-md border-t border-gray-100 dark:border-gray-800 space-y-4">
                    <MobileLink to="/" label="Home" icon={<FaHome />} />
                    <MobileLink to="/properties" label="Properties" icon={<FaList />} />
                    <MobileLink to="/services" label="Services" icon={<FaTasks />} />
                    <MobileLink to="/about" label="About Us" icon={<FaUser />} />
                    <MobileLink to="/pricing-plan" label="Pricing Plan" icon={<GiPriceTag />} />

                    {isLoggedIn && (
                        <>
                            <MobileLink to={isAdmin ? "/admin-dashboard" : "/user-dashboard"} label="Dashboard" icon={<FaDashcube />} />
                            <MobileLink to="/profile" label="My Profile" icon={<FaUser />} />
                            {isProvider && <MobileLink to="/service-provider/me" label="Service Profile" icon={<FaUserTie />} />}
                            {!user?.isServiceProvider && !isAdmin && (
                                <MobileLink to="/add-service" label="Become a Provider" icon={<FaPlusCircle />} />
                            )}
                            {!isAdmin && (
                                <Link
                                    to="/add-property"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white w-48 flex items-center gap-2 px-4 py-2 rounded-md transition"
                                >
                                    <FaPlusCircle />
                                    Add Property
                                </Link>
                            )}
                            <button onClick={logout} className="flex items-center gap-3 text-red-600 hover:text-red-700 w-full">
                                <FaSignOutAlt />
                                Logout
                            </button>
                        </>
                    )}

                    {!isLoggedIn && (
                        <>
                            <MobileLink to="/login" label="Login" icon={<FaSignInAlt />} />
                            <Link to="/register" className="btn-primary flex items-center justify-center gap-2 w-full">
                                <FaUserPlus />
                                Register
                            </Link>
                        </>
                    )}
                    <div className="pt-2">
                        <ThemeToggle />
                    </div>
                    </div>
                    
            )}
            </header>
        </>
            
    );
};

// Active-aware desktop nav item
const NavItem = ({ to, label, icon }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-2 font-medium transition ${
                isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-white hover:text-indigo-600'
            }`
        }
    >
        {icon}
        <span>{label}</span>
    </NavLink>
);

// Basic dropdown links
const DropdownLink = ({ to, label }) => (
    <Link to={to} className="block px-4 py-2 text-gray-700 dark:text-white hover:bg-indigo-50 dark:hover:bg-gray-700 transition">
        {label}
    </Link>
);

// Active-aware mobile link
const MobileLink = ({ to, label, icon }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 py-2 font-medium w-full ${
                isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-white hover:text-indigo-600'
            }`
        }
    >
        {icon}
        {label}
    </NavLink>
);

export default Header;
