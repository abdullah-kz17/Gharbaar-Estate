import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

import Hero from "../components/home/Hero.jsx";
import Services from "../components/home/Services.jsx";
import Features from "../components/home/Features.jsx";
import Testimonials from "../components/home/Testimonials.jsx";
import Steps from "../components/home/Steps.jsx";
import Stats from "../components/home/Stats.jsx";
import FAQ from "../components/home/Faqs.jsx";
import Cta from "../components/home/Cta.jsx";
import Contact from "../components/home/Contact.jsx";

export default function Home() {
    const { isLoggedIn, user } = useAuth();
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({
        services: false,
        features: false,
        testimonials: false,
        steps: false,
        stats: false,
        faq: false,
        contact: false,
    });

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleVisibility = () => {
            const sectionOffsets = {
                services: document.getElementById('services')?.offsetTop || 0,
                features: document.getElementById('features')?.offsetTop || 0,
                testimonials: document.getElementById('testimonials')?.offsetTop || 0,
                steps: document.getElementById('steps')?.offsetTop || 0,
                stats: document.getElementById('stats')?.offsetTop || 0,
                faq: document.getElementById('faq')?.offsetTop || 0,
                contact: document.getElementById('contact')?.offsetTop || 0,
            };

            Object.entries(sectionOffsets).forEach(([section, offset]) => {
                if (scrollY > offset - 400) {
                    setIsVisible(prev => ({ ...prev, [section]: true }));
                }
            });
        };

        handleVisibility();
    }, [scrollY]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300 overflow-hidden">
            <Hero isLoggedIn={isLoggedIn} user={user} />

            <section id="services">
                <Services isVisible={isVisible.services} />
            </section>

            <section id="features">
                <Features isVisible={isVisible.features} />
            </section>

            <section id="testimonials">
                <Testimonials isVisible={isVisible.testimonials} />
            </section>

            <section id="steps">
                <Steps isVisible={isVisible.steps} isLoggedIn={isLoggedIn} />
            </section>

            <section id="stats">
                <Stats isVisible={isVisible.stats} />
            </section>

            <section id="faq">
                <FAQ isVisible={isVisible.faq} />
            </section>

            <Cta isVisible={isVisible.faq} isLoggedIn={isLoggedIn} />

            <section id="contact">
                <Contact isVisible={isVisible.contact} />
            </section>

            {/* Scroll to top */}
            <motion.button
                className="fixed bottom-8 right-8 w-12 h-12 z-50 flex items-center justify-center bg-indigo-600 dark:bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                initial={{ opacity: 0 }}
                animate={{ opacity: scrollY > 300 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                aria-label="Scroll to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
            </motion.button>
        </div>
    );
}
