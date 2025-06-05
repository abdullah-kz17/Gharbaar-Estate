import React from 'react';
import { motion } from 'framer-motion';
import {
    FaUsers,
    FaLightbulb,
    FaHandshake,
    FaMedal,
    FaClock,
    FaHeart,
} from 'react-icons/fa';

const CoreValuesSection = ({ isVisible }) => {
    const values = [
        {
            icon: <FaUsers className="text-indigo-600 dark:text-indigo-400 text-4xl mb-4" />,
            title: 'Client-Centered',
            description:
                'We prioritize your needs and preferences above all else, creating solutions that genuinely improve your living experience.',
        },
        {
            icon: <FaLightbulb className="text-purple-600 dark:text-purple-400 text-4xl mb-4" />,
            title: 'Innovation',
            description:
                'We continuously develop cutting-edge technologies and approaches to solving real estate challenges.',
        },
        {
            icon: <FaHandshake className="text-amber-500 dark:text-yellow-400 text-4xl mb-4" />,
            title: 'Trust & Transparency',
            description:
                'We build relationships based on honest communication, clear pricing, and reliable service delivery.',
        },
        {
            icon: <FaMedal className="text-rose-500 dark:text-pink-400 text-4xl mb-4" />,
            title: 'Excellence',
            description:
                'We hold ourselves to the highest standards in every aspect of our service, from platform development to contractor selection.',
        },
        {
            icon: <FaClock className="text-green-600 dark:text-emerald-400 text-4xl mb-4" />,
            title: 'Efficiency',
            description:
                'We value your time and strive to optimize processes for seamless experiences and faster results.',
        },
        {
            icon: <FaHeart className="text-blue-500 dark:text-blue-400 text-4xl mb-4" />,
            title: 'Community Impact',
            description:
                "We're committed to creating better living spaces that contribute to thriving, sustainable communities.",
        },
    ];

    return (
        <section
            id="values"
            className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-indigo-850 relative overflow-hidden transition-colors duration-500"
        >
            {/* Background SVG Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg
                    className="absolute -right-20 bottom-0 opacity-10"
                    width="500"
                    height="500"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="250" cy="250" r="200" fill="#4f46e5" />
                </svg>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full uppercase tracking-wider">
                        What Drives Us
                    </span>
                    <h2 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">
                        Our Core Values
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4 text-base sm:text-lg">
                        These principles guide every decision we make and every service we provide.
                    </p>
                </motion.div>

                {/* Value Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 group hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-800 transition duration-300"
                        >
                            <div className="flex justify-center">
                                <div className="rounded-full p-4 bg-gray-50 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 transition duration-300">
                                    {value.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 mt-4 text-gray-800 dark:text-white text-center">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-center text-base sm:text-[1.05rem] leading-relaxed">
                                {value.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValuesSection;
