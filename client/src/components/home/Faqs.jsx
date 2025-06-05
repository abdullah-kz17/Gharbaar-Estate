import React, { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

// FAQ Item component — memoized for performance
const FAQItem = memo(function FAQItem({ question, answer, index }) {
    const [isOpen, setIsOpen] = useState(index === 0);

    // Unique IDs for ARIA
    const contentId = `faq-content-${index}`;
    const buttonId = `faq-button-${index}`;

    return (
        <div className="border-b border-gray-300 last:border-0 dark:border-gray-700">
            <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                className={`
          flex justify-between items-center w-full py-5 text-left
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-900
          transition-colors duration-300
        `}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3
                    className={`
            text-lg font-semibold
            text-gray-900 dark:text-gray-100
            transition-colors duration-300
          `}
                >
                    {question}
                </h3>

                <motion.div
                    className={`text-indigo-600 dark:text-indigo-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                >
                    <FaChevronDown size={18} />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p
                            className={`
                text-gray-700 dark:text-gray-300
                pb-5
                text-base
                leading-relaxed
                max-w-prose
                mx-auto
                transition-colors duration-300
              `}
                        >
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

export default function FAQ({ isVisible }) {
    const faqs = [
        {
            question: "How does the AI property matching work?",
            answer:
                "Our AI analyzes your preferences, budget, and needs to recommend properties that best match your criteria. It learns from your interactions to continuously improve recommendations.",
        },
        {
            question: "Are all contractors and service providers verified?",
            answer:
                "Yes, we thoroughly verify all contractors and service providers on our platform. We check their credentials, insurance, past work history, and client reviews to ensure quality and reliability.",
        },
        {
            question: "How accurate is the renovation advisor?",
            answer:
                "Our AI renovation advisor provides recommendations based on current market trends, your property's characteristics, and your budget. While it offers valuable insights, we always recommend consulting with professionals for final decisions.",
        },
        {
            question: "Is there a fee to use the platform?",
            answer:
                "Basic features are free for all users. Premium features, including advanced AI recommendations and priority access to verified contractors, are available with our subscription plans.",
        },
        {
            question: "How do I get started with selling my property?",
            answer:
                "Simply create an account, complete your profile, and list your property with photos and details. Our AI will help optimize your listing and connect you with potential buyers.",
        },
    ];

    return (
        <section
            id="faq"
            className="py-20 sm:py-24 bg-white dark:bg-gray-900 transition-colors duration-500"
        >
            <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
                <motion.div
                    className="text-center mb-16 max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
          <span
              className="
              inline-block
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-white text-sm font-semibold
              px-5 py-1 rounded-full uppercase tracking-wide
              shadow-md
            "
          >
            FAQ
          </span>

                    <h2
                        className="
              text-4xl font-extrabold text-gray-900 dark:text-white
              mt-6
              sm:text-5xl
              leading-tight
            "
                    >
                        Frequently Asked Questions
                    </h2>
                </motion.div>

                <motion.div
                    className="space-y-6 sm:space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
