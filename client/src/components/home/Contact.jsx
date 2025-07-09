import React from "react";
import { motion } from "framer-motion";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
    FaComments,
} from "react-icons/fa";

export default function Contact({ isVisible = true }) {
    return (
        <section
            id="contact"
            className="py-24 bg-indigo-100 dark:bg-indigo-950 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
            <span className="inline-block bg-gradient-to-r from-indigo-700 to-purple-700 text-white text-sm font-semibold px-5 py-1.5 rounded-full uppercase tracking-wider select-none shadow-lg">
              Contact Us
            </span>
                        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-indigo-100 mt-5 mb-10 leading-tight drop-shadow-md">
                            Get in Touch
                        </h2>
                        <p className="text-gray-700 dark:text-indigo-300 mb-12 max-w-xl leading-relaxed tracking-wide">
                            Have questions or need assistance? Our expert team is here to help
                            you every step of the way.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                {
                                    icon: <FaPhoneAlt className="text-indigo-700 dark:text-indigo-400" />,
                                    title: "Phone",
                                    detail: "+92 346-0219660",
                                },
                                {
                                    icon: <FaEnvelope className="text-indigo-700 dark:text-indigo-400" />,
                                    title: "Email",
                                    detail: "info@gharbaarestate.com",
                                },
                                {
                                    icon: <FaClock className="text-indigo-700 dark:text-indigo-400" />,
                                    title: "Hours",
                                    detail: "Mon-Fri: 9AM - 6PM",
                                },
                                {
                                    icon: <FaComments className="text-indigo-700 dark:text-indigo-400" />,
                                    title: "Live Chat",
                                    detail: "Available 24/7",
                                },
                            ].map(({ icon, title, detail }, idx) => (
                                <div key={idx} className="flex items-start space-x-5">
                                    <div className="bg-indigo-200 dark:bg-indigo-800 p-4 rounded-full flex-shrink-0 shadow-md">
                                        {icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-indigo-100 mb-2 tracking-wide">
                                            {title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-indigo-300 font-medium">
                                            {detail}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="bg-white dark:bg-indigo-900 rounded-3xl shadow-2xl p-10 border border-gray-200 dark:border-indigo-700"
                    >
                        <h3 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-indigo-100 tracking-tight">
                            Send Us a Message
                        </h3>
                        <form className="space-y-7" aria-label="Contact form">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block text-gray-800 dark:text-indigo-300 mb-3 font-semibold tracking-wide"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        id="fullName"
                                        type="text"
                                        placeholder="Your full name"
                                        className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-indigo-700 bg-white dark:bg-indigo-950 text-gray-900 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-500 focus:ring-3 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-800 dark:text-indigo-300 mb-3 font-semibold tracking-wide"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-indigo-700 bg-white dark:bg-indigo-950 text-gray-900 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-500 focus:ring-3 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-gray-800 dark:text-indigo-300 mb-3 font-semibold tracking-wide"
                                >
                                    Subject
                                </label>
                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-indigo-700 bg-white dark:bg-indigo-950 text-gray-900 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-500 focus:ring-3 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-gray-800 dark:text-indigo-300 mb-3 font-semibold tracking-wide"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    placeholder="Write your message here..."
                                    className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-indigo-700 bg-white dark:bg-indigo-950 text-gray-900 dark:text-indigo-100 placeholder-gray-400 dark:placeholder-indigo-500 focus:ring-3 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition min-h-[10rem]"
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
