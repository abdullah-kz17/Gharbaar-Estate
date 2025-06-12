import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllApprovedProviders } from "../../store/thunks/ServiceProviderThunk.js";
import { fetchFavoriteServices } from "../../store/thunks/FavouriteServiceThunk.js";
import ServiceProviderCard from "../../components/serviceProvider/ServiceProviderCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import debounce from "lodash.debounce";

const ServiceProvidersList = () => {
    const dispatch = useDispatch();
    const { providers, loading, error } = useSelector((state) => state.serviceProvider);
    const { favorites } = useSelector((state) => state.favoriteServices);

    const [filters, setFilters] = useState({
        rating: "",
        service: "",
        city: "",
        search: "",
    });

    // Create a Set of favorited service provider IDs for quick lookup
    const favoriteProviderIds = new Set(
        favorites.map(fav =>
            typeof fav.serviceProviderId === "string"
                ? fav.serviceProviderId
                : fav.serviceProviderId?._id
        )
    );

    // Debounced fetch
    const fetchProviders = useCallback(
        debounce((currentFilters) => {
            const queryParams = new URLSearchParams();
            Object.entries(currentFilters).forEach(([key, val]) => {
                if (val) queryParams.append(key, val);
            });
            dispatch(getAllApprovedProviders(`?${queryParams.toString()}`));
        }, 500),
        []
    );

    // Load favorites on mount
    useEffect(() => {
        dispatch(fetchFavoriteServices());
    }, [dispatch]);

    // Immediate fetch on mount (without debounce)
    useEffect(() => {
        dispatch(getAllApprovedProviders(""));
    }, [dispatch]);

    // Debounced fetch when filters change
    useEffect(() => {
        fetchProviders(filters);
        return fetchProviders.cancel;
    }, [filters]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleChange = (e) => {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-indigo-800 dark:text-indigo-300 mb-10">
                    Find Trusted Service Providers
                </h2>

                {/* Filter Bar */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input
                            name="search"
                            type="text"
                            placeholder="Search by name or description"
                            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                            value={filters.search}
                            onChange={handleChange}
                        />
                        <select
                            name="service"
                            value={filters.service}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                        >
                            <option value="">All Services</option>
                            {[
                                "Plumbing", "Painting", "Electrical", "Renovation", "Interior Design",
                                "Cleaning", "Architecture", "Furniture", "Other"
                            ].map(service => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                        <input
                            name="city"
                            type="text"
                            placeholder="City"
                            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                            value={filters.city}
                            onChange={handleChange}
                        />
                        <select
                            name="rating"
                            value={filters.rating}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                        >
                            <option value="">Min Rating</option>
                            {[5, 4, 3, 2, 1].map(r => (
                                <option key={r} value={r}>{r} ⭐ & up</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center py-10">
                        <Loader />
                    </div>
                ) : providers.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 text-lg italic">
                        No service providers match your criteria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {providers.map((provider) => (
                            <ServiceProviderCard
                                key={provider._id}
                                provider={provider}
                                isFavorited={favoriteProviderIds.has(provider._id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServiceProvidersList;
