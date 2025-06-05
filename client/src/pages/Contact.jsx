import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
    FaComments,
    FaPaperPlane,
} from 'react-icons/fa';
import { axiosPrivate } from '../utils/axiosInstance.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function ContactPage() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                fullName: user.username || '',
                email: user.email || '',
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosPrivate.post('/contact', formData);
            toast.success(res.data.message || 'Message sent successfully!');
            setFormData({
                fullName: user?.username || '',
                email: user?.email || '',
                subject: '',
                message: '',
            });
        } catch (err) {
            toast.error(
                err?.response?.data?.error || 'Failed to send message. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900 dark:to-indigo-950 pt-20 pb-20 px-6 sm:px-12 lg:px-20">
            {/* Title Section */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center mb-4"
                >
                    <div className="bg-gradient-to-r from-purple-400 to-indigo-600 dark:from-purple-700 dark:to-indigo-900 p-5 rounded-full shadow-lg">
                        <FaPaperPlane className="text-white text-4xl" />
                    </div>
                </motion.div>
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                    Let’s Connect
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
                    Have questions or need help? Drop us a message and our team will get back to you quickly.
                </p>
            </div>
            <hr className="border-t-2 border-indigo-300 dark:border-indigo-300 my-8 w-full max-w-7xl mx-auto" />
            {/* Contact Info & Form */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-900 dark:text-gray-100"
                >
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-1 rounded-full uppercase tracking-widest inline-block">
            Contact Us
          </span>
                    <h2 className="text-4xl font-extrabold mt-4 mb-8">Get in Touch</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                        Have questions or need assistance? Our expert team is here to help you every step of the way.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <FaPhoneAlt className="text-indigo-600 dark:text-indigo-400" />,
                                title: 'Phone',
                                value: '+92 3460219660',
                            },
                            {
                                icon: <FaEnvelope className="text-indigo-600 dark:text-indigo-400" />,
                                title: 'Email',
                                value: 'abdxllah.khan@gmail.com',
                            },
                            {
                                icon: <FaClock className="text-indigo-600 dark:text-indigo-400" />,
                                title: 'Hours',
                                value: 'Mon-Fri: 9AM - 6PM',
                            },
                            {
                                icon: <FaComments className="text-indigo-600 dark:text-indigo-400" />,
                                title: 'Live Chat',
                                value: 'Available 24/7',
                            },
                        ].map(({ icon, title, value }) => (
                            <div key={title} className="flex items-start gap-4">
                                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full shadow-sm flex-shrink-0">
                                    {icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">{title}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 border border-gray-100 dark:border-gray-700"
                >
                    <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                        Send Us a Message
                    </h3>
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="fullName"
                                    className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    autoComplete="name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                            >
                                Subject
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition min-h-[150px] resize-none"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Illustration / Map */}
            <div className="mt-24 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="w-full h-96 sm:h-[400px]"
                >
                    <iframe
                        title="Company Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1320571960523!2d-122.41941548468763!3d37.77492977975853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064c6b1f6cf%3A0x5e69e94e2eb0f8df!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1612359023123!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="block"
                    ></iframe>
                </motion.div>
            </div>
        </div>
    );
}
