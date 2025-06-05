import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaArrowRight,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt
} from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 relative">
            {/* Gradient Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Company Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-4">
                            <img src="/logo2.png" alt="Logo" className="h-8 w-8" />
                            <span className="text-2xl font-bold text-white dark:text-white hover:text-indigo-600">Gharbaar Estate</span>
                        </Link>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Revolutionizing the way you buy, sell, and renovate homes with intelligent solutions.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-gray-400 hover:text-indigo-400 transition">
                                <FaEnvelope className="text-indigo-400" />
                                <a href="mailto:info@gharbaar.com">info@gharbaar.com</a>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 hover:text-indigo-400 transition">
                                <FaPhone className="text-indigo-400" />
                                <a href="tel:+123456789">+1 (234) 567-89</a>
                            </div>
                            <div className="flex items-start gap-3 text-gray-400">
                                <FaMapMarkerAlt className="text-indigo-400 mt-1" />
                                <p>123 Estate Avenue, Real City, RC 10001</p>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center">
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 w-10 h-10 rounded-full flex items-center justify-center">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                            <span className="border-b-2 border-indigo-500 pb-2">Quick Links</span>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/properties" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Properties</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Services</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                            <span className="border-b-2 border-indigo-500 pb-2">Services</span>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/services/buying" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Buying</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/selling" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Selling</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/renovation" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Renovation</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/interior-design" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>Interior Design</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/services/ai-analysis" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <span className="text-xs text-indigo-400">▸</span>
                                    <span>AI Property Analysis</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800">
                            <span className="border-b-2 border-indigo-500 pb-2">Newsletter</span>
                        </h3>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Subscribe to get the latest updates and exclusive property listings.
                        </p>
                        <form className="mb-6">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="bg-gray-800 text-white px-4 py-3 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-700"
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 px-4 py-3 rounded-r-md transition"
                                >
                                    <FaArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </form>

                        {/* App Download */}
                        <div>
                            <p className="text-gray-300 mb-3">Download our app:</p>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-3 py-2 rounded-md">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.928 19.04c-.644.648-1.267.997-1.872 1.054a11.115 11.115 0 01-1.637.123c-.56 0-1.104-.043-1.635-.123-.604-.057-1.226-.406-1.872-1.053l-5.197-5.214a6.92 6.92 0 01-1.679-2.525 7.606 7.606 0 01-.565-2.776c0-.947.188-1.875.565-2.776a6.893 6.893 0 011.679-2.525l.637-.642c.4-.401.695-.464.89-.464.18 0 .353.063.517.178.3.21.45.513.45.91 0 .267-.107.623-.323.856l-.644.65c-.347.355-.637.77-.868 1.242a5.457 5.457 0 00-.58 2.57c0 .894.193 1.747.58 2.57.23.473.52.888.868 1.243l5.198 5.214c.347.347.75.635 1.21.865a5.32 5.32 0 002.524.578c.903 0 1.755-.193 2.57-.58.471-.23.886-.52 1.241-.866l.642-.644c.233-.216.59-.325.857-.325.396 0 .7.15.91.45.115.165.178.337.178.517 0 .195-.063.49-.464.89l-.643.642z"/>
                                        <path d="M10.45 14.037a1.501 1.501 0 010-2.121L14.037 8.33a1.5 1.5 0 012.122 2.12l-3.589 3.588a1.5 1.5 0 01-2.121 0z"/>
                                    </svg>
                                    <div>
                                        <div className="text-xs">Download on</div>
                                        <div className="text-sm font-medium">App Store</div>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-3 py-2 rounded-md">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 2.25c-.892 0-1.609.717-1.609 1.609v16.281c0 .893.717 1.61 1.61 1.61h16.281c.893 0 1.61-.717 1.61-1.61V3.86c0-.892-.717-1.609-1.61-1.609H3.61z"/>
                                        <path fill="#fff" d="M7.363 7.452L12 12.09l1.535-1.535 3.103 3.103v-6.09h-9.09v5.149l-.185.185v-5.45z"/>
                                        <path fill="#fff" d="M12 15.194l3.102-3.103 1.535 1.535v3.103h-9.09v-6.09l4.453 4.555z"/>
                                    </svg>
                                    <div>
                                        <div className="text-xs">Download on</div>
                                        <div className="text-sm font-medium">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © 2025 Gharbaar Estate. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                            Terms of Service
                        </Link>
                        <Link to="/sitemap" className="text-gray-400 hover:text-indigo-400 transition text-sm">
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}



