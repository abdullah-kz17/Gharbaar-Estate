// components/home/Services.jsx
import React from "react";
import { motion } from "framer-motion";
import {
    FaHammer,
    FaUserShield,
    FaHome,
    FaRobot,
    FaMapMarkedAlt,
    FaHandshake,
} from "react-icons/fa";

export default function Services({ isVisible }) {
    const services = [
        {
            icon: <FaHammer className="text-red-500 text-4xl mb-4" aria-hidden="true" />,
            title: "Premium Renovation",
            description:
                "Expert renovation services tailored to your unique vision and lifestyle needs.",
        },
        {
            icon: <FaUserShield className="text-green-600 text-4xl mb-4" aria-hidden="true" />,
            title: "Verified Contractors",
            description:
                "Connect with trusted professionals who have proven track records and verified credentials.",
        },
        {
            icon: <FaHome className="text-yellow-500 text-4xl mb-4" aria-hidden="true" />,
            title: "Interior Design",
            description:
                "Transform your space with expert designers who understand your aesthetic and functional needs.",
        },
        {
            icon: <FaRobot className="text-purple-600 text-4xl mb-4" aria-hidden="true" />,
            title: "AI Renovation Advisor",
            description:
                "Leverage artificial intelligence to analyze your space and suggest optimal improvements.",
        },
        {
            icon: <FaMapMarkedAlt className="text-blue-500 text-4xl mb-4" aria-hidden="true" />,
            title: "Nearby Services",
            description:
                "Discover top-rated plumbers, electricians & specialists in your neighborhood.",
        },
        {
            icon: <FaHandshake className="text-rose-500 text-4xl mb-4" aria-hidden="true" />,
            title: "Seamless Coordination",
            description:
                "Manage all your projects and service bookings in one intuitive dashboard.",
        },
    ];

    return (
        <section
            id="services"
            className="relative py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900 dark:to-indigo-800 transition-colors duration-500 overflow-hidden"
            aria-label="Our Services"
        >
            {/* Background SVGs */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    className="absolute left-0 top-0 opacity-10 dark:opacity-20"
                    width="500"
                    height="500"
                    viewBox="0 0 500 500"
                    aria-hidden="true"
                    focusable="false"
                >
                    <circle cx="250" cy="250" r="200" fill="#4f46e5" />
                </svg>
                <svg
                    className="absolute right-0 bottom-0 opacity-10 dark:opacity-20"
                    width="600"
                    height="600"
                    viewBox="0 0 600 600"
                    aria-hidden="true"
                    focusable="false"
                >
                    <circle cx="300" cy="300" r="250" fill="#8b5cf6" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full uppercase tracking-wider select-none">
            Our Services
          </span>
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-12">
                        Transformative Home Solutions
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -10,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            className="bg-white dark:bg-indigo-900 rounded-xl shadow-md p-8 group hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-700 dark:hover:to-purple-700 transition duration-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-purple-500"
                            tabIndex={0}
                            role="article"
                            aria-labelledby={`service-title-${index}`}
                            aria-describedby={`service-desc-${index}`}
                        >
                            <div className="flex justify-center">
                                <div className="rounded-full p-4 bg-gray-50 dark:bg-indigo-800 group-hover:bg-white dark:group-hover:bg-indigo-700 transition duration-300">
                                    {service.icon}
                                </div>
                            </div>
                            <h3
                                id={`service-title-${index}`}
                                className="text-xl font-semibold mb-3 mt-4 text-gray-800 dark:text-gray-100"
                            >
                                {service.title}
                            </h3>
                            <p
                                id={`service-desc-${index}`}
                                className="text-gray-600 dark:text-gray-300"
                            >
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
