// components/home/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote:
            "The AI renovation advisor saved us thousands by identifying the most value-adding improvements for our home before selling.",
        author: "Sarah J.",
        role: "Home Seller",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        quote:
            "As a first-time homebuyer, I was overwhelmed until I found this platform. The AI property finder understood exactly what I wanted.",
        author: "Michael T.",
        role: "Home Buyer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        quote:
            "The contractor verification system gave us peace of mind. Every professional we hired through the platform exceeded our expectations.",
        author: "Emma R.",
        role: "Homeowner",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

export default function Testimonials({ isVisible }) {
    return (
        <section
            id="testimonials"
            className="py-24 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-indigo-900 transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                {/* Heading */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
          <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-5 py-1 rounded-full uppercase tracking-wider select-none">
            Success Stories
          </span>
                    <h2 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                        What Our Clients Say
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -10, boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)" }}
                            className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg cursor-default select-text transition-transform duration-300"
                        >
                            {/* Decorative Quote */}
                            <div className="absolute -top-5 left-8 text-indigo-500 dark:text-indigo-400 text-6xl font-serif select-none pointer-events-none">
                                “
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 italic mb-8 leading-relaxed">
                                {testimonial.quote}
                            </p>

                            <div className="flex items-center">
                                <img
                                    src={testimonial.avatar}
                                    alt={`${testimonial.author} avatar`}
                                    className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-indigo-600 dark:border-indigo-400"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                        {testimonial.author}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
