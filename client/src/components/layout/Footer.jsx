import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaList,
  FaTasks,
  FaUser,
  FaChevronUp,
} from 'react-icons/fa';
import { GiPriceTag } from 'react-icons/gi';
import GharbaarLogo from '../common/GharbaarLogo.jsx';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', to: '/', icon: <FaHome /> },
    { label: 'Properties', to: '/properties', icon: <FaList /> },
    { label: 'Services', to: '/services', icon: <FaTasks /> },
    { label: 'Blogs', to: '/blogs', icon: <FaTasks /> },
    { label: 'About Us', to: '/about', icon: <FaUser /> },
    { label: 'Contact Us', to: '/contact', icon: <FaEnvelope /> },
    { label: 'Pricing Plan', to: '/pricing-plan', icon: <GiPriceTag /> },
  ];

  

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-950 text-white dark:text-gray-200 pt-6 pb-2 relative overflow-x-hidden border-t border-indigo-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-8 md:gap-0 py-6 border-b border-gray-800 dark:border-gray-800">
          {/* Left: Logo, description, social, contact */}
          <div className="flex-1 flex flex-col justify-between min-w-[220px]">
            <div className="flex items-center gap-3 mb-2">
              <GharbaarLogo />
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm mb-3 max-w-xs">
              Revolutionizing the way you buy, sell, and renovate homes with intelligent solutions.
            </p>
            <div className="flex items-center gap-3 mb-3">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) =>
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-colors" aria-label="Social link">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 items-center">
              <span className="flex items-center gap-1"><FaEnvelope className="text-indigo-400" /><a href="mailto:info@gharbaar.com">info@gharbaarestate.com</a></span>
              <span className="flex items-center gap-1"><FaPhone className="text-indigo-400 rtl:rotate-180" style={{direction: 'ltr'}} /><a href="tel:+923460219660">+92 346-0219660</a></span>
              <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-indigo-400" /><span>123 Estate Avenue, Real City</span></span>
            </div>
          </div>

          {/* Divider for desktop */}
          <div className="hidden md:block w-px bg-gray-800 mx-8"></div>

          {/* Right: Quick Links in two columns */}
          <div className="flex-1 flex flex-col justify-center min-w-[220px]">
            <h3 className="text-lg font-semibold mb-3 border-b border-gray-800 dark:border-gray-700 pb-2 w-fit">
              <span className="border-b-2 border-indigo-500 pb-2">Quick Links</span>
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {quickLinks.map((item, idx) =>
                <Link key={idx} to={item.to} className="flex items-center gap-2 text-gray-300 dark:text-gray-400 hover:text-indigo-400 transition text-sm whitespace-nowrap">
                  <span className="text-indigo-400">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-4">
          <p className="text-gray-400 dark:text-gray-500 text-xs md:text-sm">
            © 2025 Gharbaar Estate. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}
