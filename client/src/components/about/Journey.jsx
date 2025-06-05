import React from 'react';
import { motion } from 'framer-motion';

const Journey = ({ isVisible }) => {
    const timeline = [
        {
            year: "2019",
            title: "The Beginning",
            description: "Our founders Abdullah and Bilawal launched with a vision to reinvent the real estate experience using AI technology."
        },
        {
            year: "2020",
            title: "Platform Launch",
            description: "We launched our first version of the AI property matching system, quickly gaining attention in the market."
        },
        {
            year: "2021",
            title: "Expanding Services",
            description: "Added renovation services and contractor verification to create a full-service ecosystem for homeowners."
        },
        {
            year: "2022",
            title: "AI Revolution",
            description: "Introduced our revolutionary AI Renovation Advisor, setting a new standard in the industry."
        },
        {
            year: "2023",
            title: "National Expansion",
            description: "Expanded to 15 major cities across the country, with plans for international growth."
        },
        {
            year: "2024",
            title: "Where We Are Now",
            description: "Continuing to innovate with cutting-edge features and growing our community of satisfied homeowners."
        }
    ];

    return (
        <section
            id="journey"
            className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-indigo-900 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible.journey ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-5 py-1.5 rounded-full uppercase tracking-wider shadow">
                        Our Story
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-indigo-100 mt-5">
                        The Journey So Far
                    </h2>
                    <p className="text-gray-600 dark:text-indigo-300 max-w-2xl mx-auto mt-4 text-lg leading-relaxed">
                        From a small startup to a transformative real estate platform, here's how we've evolved.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-200 dark:bg-indigo-700 rounded-full" />

                    {timeline.map((item, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                animate={isVisible.journey ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center mb-20 ${
                                    isLeft ? 'md:justify-end' : 'md:justify-start'
                                }`}
                            >
                                {/* Card Content */}
                                <div
                                    className={`w-full md:w-5/12 ${
                                        isLeft ? 'md:pr-12 text-right md:text-left' : 'md:pl-12 text-left'
                                    }`}
                                >
                                    <div className="p-6 bg-white dark:bg-indigo-950 border border-gray-100 dark:border-indigo-800 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                                        <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                                            {item.year}
                                        </span>
                                        <h3 className="text-xl font-bold mt-3 mb-2 text-gray-800 dark:text-indigo-100">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-indigo-300 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Dot Marker */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-3 z-10">
                                    <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-white dark:border-indigo-900 shadow-md" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Journey;
