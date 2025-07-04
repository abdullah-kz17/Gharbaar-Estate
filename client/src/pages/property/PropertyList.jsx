import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import PropertyCard from "../../components/listings/PropertyCard.jsx";
import { getAllProperties, searchProperties } from "../../store/thunks/PropertyThunk.js";
import Loader from "../../components/common/Loader.jsx";
import { getUserFavorites } from "../../store/thunks/FavouriteThunk.js";
import Pagination from '../../components/common/Pagination.jsx';
import PageHeader from '../../components/common/PageHeader';

const examplePrompts = [
    "3 bedroom house in Lahore under 1 crore",
    "Apartment with 2 baths in Karachi",
    "Budget 50 lakh, kitchen and 2 beds",
    "Location Islamabad, area Gulberg",
    "Looking for 1 bedroom below Rs. 30 lakh",
];

const PropertyList = () => {
    const dispatch = useDispatch();
    const { properties, searchResults, loading, error, totalPages } = useSelector((state) => state.property);
    const { favorites } = useSelector((state) => state.favorite);

    const [prompt, setPrompt] = useState("");
    const [debouncedPrompt, setDebouncedPrompt] = useState("");
    const [placeholder, setPlaceholder] = useState(examplePrompts[0]);
    const [initialLoad, setInitialLoad] = useState(true);
    const placeholderIndex = useRef(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 12;

    // Rotate example prompts every 4s
    useEffect(() => {
        const interval = setInterval(() => {
            placeholderIndex.current = (placeholderIndex.current + 1) % examplePrompts.length;
            setPlaceholder(examplePrompts[placeholderIndex.current]);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Initial fetch - load favorites first, then properties
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                await dispatch(getUserFavorites()).unwrap();
                await dispatch(getAllProperties({ page: 1, limit })).unwrap();
            } catch (error) {
                console.error("Error loading initial data:", error);
            } finally {
                setInitialLoad(false);
            }
        };
        loadInitialData();
    }, [dispatch]);

    // Show error toast
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
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
        if (!initialLoad) {
            if (debouncedPrompt) {
                dispatch(searchProperties({ prompt: debouncedPrompt }));
            } else {
                dispatch(getAllProperties({ page: currentPage, limit }));
            }
        }
    }, [debouncedPrompt, dispatch, initialLoad, currentPage]);

    const displayedProperties = useMemo(
        () => (debouncedPrompt ? searchResults : properties) || [],
        [debouncedPrompt, searchResults, properties]
    );

    // Sort: Featured properties on top
    const sortedProperties = useMemo(() => {
        const props = [...displayedProperties];
        return props.sort((a, b) => {
            if (a.isFeatured === b.isFeatured) return 0;
            return a.isFeatured ? -1 : 1;
        });
    }, [displayedProperties]);

    // Helper function to check if property is favorited
    const isPropertyFavorited = (propertyId) => {
        if (!favorites || !Array.isArray(favorites) || !propertyId) return false;
        return favorites.some(fav =>
            fav?.propertyId?._id === propertyId || fav?._id === propertyId
        );
    };

    // Handle favorite toggle from property card
    const handleFavoriteToggle = async () => {
        // Refresh favorites after toggle to ensure consistency
        try {
            await dispatch(getUserFavorites()).unwrap();
        } catch (error) {
            console.error("Error refreshing favorites:", error);
        }
    };

    // Show loading during initial load
    if (initialLoad || (loading && !displayedProperties.length)) {
        return (
            <section className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="flex justify-center py-20">
                        <Loader />
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <PageHeader
                title="Find Your Dream Property"
                subtitle="Browse, search, and discover the best properties tailored to your needs. Use natural language search for a smarter experience."
                backgroundImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
            />
            <section className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
                <div className="max-w-7xl mx-auto">
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

                    {/* Loading state during search */}
                    {loading && !initialLoad && (
                        <div className="text-center mb-10">
                            <p className="text-indigo-600 dark:text-indigo-300 text-xl font-semibold animate-pulse">
                                {debouncedPrompt ? "Searching properties..." : "Loading properties..."}
                            </p>
                        </div>
                    )}

                    {/* Results */}
                    {!loading && sortedProperties.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 text-lg mb-10 italic">
                            {debouncedPrompt ? "No properties found matching your search. Try different keywords!" : "No properties available."}
                        </p>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {sortedProperties.map((property) => {
                                    if (!property?._id) return null;
                                    return (
                                        <PropertyCard
                                            key={property._id}
                                            property={property}
                                            isFavorited={isPropertyFavorited(property._id)}
                                            onToggleFavorite={handleFavoriteToggle}
                                        />
                                    );
                                })}
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages || 1}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </>
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
        </>
    );
};

export default PropertyList;