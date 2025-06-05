import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const TeamSection = ({ isVisible, teamMembers }) => {
    return (
        <section
            id="team"
            className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950 dark:to-indigo-900 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-5 py-1.5 rounded-full uppercase tracking-wider shadow">
                        Meet Our Experts
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-indigo-100 mt-5">
                        The Team Behind the Magic
                    </h2>
                    <p className="text-gray-600 dark:text-indigo-300 max-w-2xl mx-auto mt-4 text-lg leading-relaxed">
                        Our diverse team of experts combines real estate knowledge, technical innovation, and a passion for transforming living spaces.
                    </p>
                </motion.div>

                {/* Team Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{
                                y: -8,
                                scale: 1.01,
                                transition: { type: 'spring', stiffness: 300 },
                            }}
                            className="bg-white dark:bg-indigo-950 rounded-2xl overflow-hidden shadow-lg dark:shadow-indigo-800 border border-gray-100 dark:border-indigo-800 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-indigo-700/90 to-transparent px-6 py-4">
                                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                                    <p className="text-indigo-200 text-sm">{member.role}</p>
                                </div>
                            </div>

                            {/* Bio & Social */}
                            <div className="px-6 py-6">
                                <p className="text-gray-600 dark:text-indigo-300 mb-5 leading-relaxed text-sm sm:text-base">
                                    {member.bio}
                                </p>
                                <div className="flex items-center space-x-5">
                                    {member.social.linkedin && (
                                        <a
                                            href={member.social.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                                        >
                                            <FaLinkedin className="text-xl" />
                                        </a>
                                    )}
                                    {member.social.twitter && (
                                        <a
                                            href={member.social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                                        >
                                            <FaTwitter className="text-xl" />
                                        </a>
                                    )}
                                    {member.social.instagram && (
                                        <a
                                            href={member.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition"
                                        >
                                            <FaInstagram className="text-xl" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
