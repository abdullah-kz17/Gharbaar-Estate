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
import GharbaarLogo from '../common/GharbaarLogo.jsx';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/properties' },
    { label: 'Services', to: '/services' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' }
  ];

  const serviceLinks = [
    { label: 'Buying', to: '/services/buying' },
    { label: 'Selling', to: '/services/selling' },
    { label: 'Renovation', to: '/services/renovation' },
    { label: 'Interior Design', to: '/services/interior-design' },
    { label: 'AI Property Analysis', to: '/services/ai-analysis' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white dark:text-gray-200 pt-16 pb-8 relative ">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <GharbaarLogo />
            <p className="text-gray-300 dark:text-gray-400 mb-6 leading-relaxed">
              Revolutionizing the way you buy, sell, and renovate homes with intelligent solutions.
            </p>
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
            <div className="flex space-x-4">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) =>
                <a key={i} href="#" className="bg-gray-800 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 w-10 h-10 rounded-full flex items-center justify-center transition">
                  <Icon className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800 dark:border-gray-700">
              <span className="border-b-2 border-indigo-500 pb-2">Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item, idx) =>
                <li key={idx}>
                  <Link to={item.to} className="flex items-center gap-2 text-gray-300 dark:text-gray-400 hover:text-white transition">
                    <span className="text-xs text-indigo-400">▸</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800 dark:border-gray-700">
              <span className="border-b-2 border-indigo-500 pb-2">Services</span>
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((item, idx) =>
                <li key={idx}>
                  <Link to={item.to} className="flex items-center gap-2 text-gray-300 dark:text-gray-400 hover:text-white transition">
                    <span className="text-xs text-indigo-400">▸</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-800 dark:border-gray-700">
              <span className="border-b-2 border-indigo-500 pb-2">Newsletter</span>
            </h3>
            <p className="text-gray-300 dark:text-gray-400 mb-4 leading-relaxed">
              Subscribe for exclusive updates and property alerts.
            </p>
            <form className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 px-4 py-3 rounded-r-md transition">
                  <FaArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </form>
            <div>
              <p className="text-gray-300 dark:text-gray-400 mb-3">Download our app:</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a href="#" className="flex items-center gap-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md transition">
                  <div className="w-6 h-6 bg-white text-black rounded-md flex items-center justify-center text-xs font-bold"></div>
                  <div>
                    <div className="text-xs">Download on</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md transition">
                  <div className="w-6 h-6 bg-white text-black rounded-md flex items-center justify-center text-xs font-bold">▶</div>
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
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Gharbaar Estate. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((name, i) =>
              <Link key={i} to={`/${name.toLowerCase().split(' ').join('-')}`} className="text-gray-400 dark:text-gray-500 hover:text-indigo-400 transition text-sm">
                {name}
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
