import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PropertyCard from "../../components/listings/PropertyCard.jsx";
import { getAllProperties, searchProperties } from "../../store/thunks/PropertyThunk.js";
import Loader from "../../components/common/Loader.jsx";

const examplePrompts = [
    "3 bedroom house in Lahore under 1 crore",
    "Apartment with 2 baths in Karachi",
    "Budget 50 lakh, kitchen and 2 beds",
    "Location Islamabad, area Gulberg",
    "Looking for 1 bedroom below Rs. 30 lakh",
];

const PropertyList = () => {
    const dispatch = useDispatch();
    const { properties, searchResults, loading, error } = useSelector((state) => state.property);

    const [prompt, setPrompt] = useState("");
    const [debouncedPrompt, setDebouncedPrompt] = useState("");
    const [placeholder, setPlaceholder] = useState(examplePrompts[0]);
    const placeholderIndex = useRef(0);

    // Rotate example prompts every 4s
    useEffect(() => {
        const interval = setInterval(() => {
            placeholderIndex.current = (placeholderIndex.current + 1) % examplePrompts.length;
            setPlaceholder(examplePrompts[placeholderIndex.current]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Initial fetch
    useEffect(() => {
        dispatch(getAllProperties());
    }, [dispatch]);

    // Show error toast
    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    // Debounce input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedPrompt(prompt.trim());
        }, 400);
        return () => clearTimeout(handler);
    }, [prompt]);

    // Search or fetch all
    useEffect(() => {
        if (debouncedPrompt) {
            dispatch(searchProperties({ prompt: debouncedPrompt }));
        } else {
            dispatch(getAllProperties());
        }
    }, [debouncedPrompt, dispatch]);

    const displayedProperties = useMemo(
        () => (debouncedPrompt ? searchResults : properties),
        [debouncedPrompt, searchResults, properties]
    );

    return (
        <section className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-800 dark:text-indigo-300 mb-6 drop-shadow-md">
                    Find Your Dream Property
                </h1>

                <p className="text-center text-indigo-600 dark:text-indigo-200 text-lg max-w-2xl mx-auto mb-10">
                    No complicated filters — just type what you want in plain language and we’ll find the best matches for you!
                </p>

                {/* Search Input */}
                <div className="max-w-xl mx-auto mb-12 relative">
                    <input
                        type="search"
                        aria-label="Search properties"
                        placeholder={placeholder}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 text-lg
                                   text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-md
                                   focus:outline-none focus:ring-4 focus:ring-indigo-400 dark:focus:ring-indigo-500
                                   focus:border-indigo-400 dark:focus:border-indigo-500 transition duration-300"
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 font-semibold select-none pointer-events-none">
                        🔍
                    </span>
                </div>

                {/* Feedback */}
                {loading ? (
                    <p className="text-center text-indigo-600 dark:text-indigo-300 text-xl font-semibold animate-pulse mb-10">
                        <Loader />
                    </p>
                ) : displayedProperties?.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 text-lg mb-10 italic">
                        No properties found. Try different keywords!
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedProperties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}

                {/* Tip Box */}
                <div className="mt-16 max-w-2xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500
                                    text-white text-sm rounded-xl px-6 py-4 shadow-lg">
                        💡 Tip: Try prompts like <em>"2 beds kitchen under 70 lakh in Karachi"</em> or <em>"budget 50 lakh, 1 bath, Islamabad"</em> for better results!
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyList;
