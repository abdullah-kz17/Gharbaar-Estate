// Stats.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBuilding, FaHammer, FaChartLine } from "react-icons/fa";

export default function Stats({ isVisible }) {
    const statsData = [
        {
            icon: <FaUsers className="text-5xl mb-4" aria-hidden="true" />,
            value: "20,000+",
            label: "Happy Clients",
        },
        {
            icon: <FaBuilding className="text-5xl mb-4" aria-hidden="true" />,
            value: "15,000+",
            label: "Properties Sold",
        },
        {
            icon: <FaHammer className="text-5xl mb-4" aria-hidden="true" />,
            value: "8,500+",
            label: "Renovations",
        },
        {
            icon: <FaChartLine className="text-5xl mb-4" aria-hidden="true" />,
            value: "99%",
            label: "Satisfaction Rate",
        },
    ];

    return (
        <section
            id="stats"
            className="py-20 bg-gradient-to-r from-indigo-700 to-purple-700 text-white dark:from-indigo-900 dark:to-purple-900 transition-colors duration-500"
            aria-label="Statistics"
        >
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    {statsData.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 rounded-xl p-8 backdrop-blur-sm cursor-default
                         focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-500
                         transition-shadow duration-300 hover:shadow-xl"
                            tabIndex={0} // makes div focusable for keyboard users
                            role="group"
                            aria-labelledby={`stat-label-${index}`}
                            aria-describedby={`stat-value-${index}`}
                        >
                            <div className="flex justify-center text-white/90">{stat.icon}</div>
                            <h3
                                id={`stat-value-${index}`}
                                className="text-3xl font-bold leading-tight"
                            >
                                {stat.value}
                            </h3>
                            <p id={`stat-label-${index}`} className="text-white/80 text-lg mt-1">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
