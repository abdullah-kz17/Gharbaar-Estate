// src/pages/About.jsx
import React, { useState, useEffect, useRef } from 'react';
import AboutHero from "../components/about/AboutHero.jsx";
import MissionVisionSection from "../components/about/MissionVision.jsx";
import CallToAction from "../components/about/AboutCta.jsx";
import TeamSection from "../components/about/Team.jsx";
import CoreValuesSection from "../components/about/CoreValues.jsx";
import Stats from "../components/home/Stats.jsx";
import Contact from "../components/home/Contact.jsx";
import Journey from "../components/about/Journey.jsx";

export default function About() {
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState({
        mission: false,
        team: false,
        values: false,
        stats: false,
        journey: false,
        contact: false,
    });

    // Cache offsets to avoid recalculating on each scroll
    const sectionOffsets = useRef({});

    // Update cached offsets on mount and on window resize
    useEffect(() => {
        const updateOffsets = () => {
            sectionOffsets.current = {
                mission: document.getElementById('mission')?.offsetTop || 0,
                team: document.getElementById('team')?.offsetTop || 0,
                values: document.getElementById('values')?.offsetTop || 0,
                stats: document.getElementById('stats')?.offsetTop || 0,
                journey: document.getElementById('journey')?.offsetTop || 0,
                contact: document.getElementById('contact')?.offsetTop || 0,
            };
        };
        updateOffsets();
        window.addEventListener('resize', updateOffsets);
        return () => window.removeEventListener('resize', updateOffsets);
    }, []);

    // Throttled scroll handler for performance
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Update visibility state based on scroll position and cached offsets
    useEffect(() => {
        const threshold = 400;
        const newVisibility = { ...isVisible };
        let hasChange = false;

        Object.entries(sectionOffsets.current).forEach(([key, offset]) => {
            if (!newVisibility[key] && scrollY > offset - threshold) {
                newVisibility[key] = true;
                hasChange = true;
            }
        });

        if (hasChange) {
            setIsVisible(newVisibility);
        }
    }, [scrollY, isVisible]);

    // Smooth scroll to mission section
    const scrollToMission = () => {
        document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
    };

    const teamMembers = [
    {
        name: "Abdullah Khan",
        role: "Frontend Developer & Lead",
        bio: "Abdullah worked on building interactive UI components using React and implemented user-friendly navigation across the platform.",
        image: "/images/Abdullah.png",
        social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
        name: "Bilawal Hassan",
        role: "Backend Developer",
        bio: "Bilawal handled Node.js and Express backend development, focusing on secure API creation and MongoDB database integration.",
        image: "/images/Bilawal.jpg",
        social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
        name: "Husnain Ali",
        role: "UI/UX Designer",
        bio: "Husnain led the design efforts using Figma and implemented clean layouts, enhancing the user experience and project presentation.",
        image: "/images/Husnain.jpeg",
        social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
        name: "Muhammad Haris",
        role: "Project Manager",
        bio: "Haris coordinated tasks among team members, managed GitHub workflows, and ensured that deadlines and milestones were met effectively.",
        image: "/images/Haris.jpg",
        social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
        name: "Ali Husnain",
        role: "QA & Deployment Lead",
        bio: "Ali focused on testing core features, fixing bugs, and deploying the MERN stack application to production using services like Render/Heroku.",
        image: "/images/Ali.jpg",
        social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
];


    return (
        <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden transition-colors duration-500">
            <AboutHero scrollY={scrollY} scrollToMission={scrollToMission} />
            <MissionVisionSection isVisible={isVisible} />
            <CallToAction />
            <TeamSection isVisible={isVisible} teamMembers={teamMembers} />
            <CoreValuesSection isVisible={isVisible} />
            <Stats isVisible={isVisible.stats} />
            <Journey isVisible={isVisible} />
            <section id="contact">
                <Contact isVisible={isVisible.contact} />
            </section>
        </div>
    );
}
