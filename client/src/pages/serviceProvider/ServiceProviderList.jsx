import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

import {
  getAllApprovedProviders
} from "../../store/thunks/ServiceProviderThunk.js";

import {
  fetchFavoriteServices,
  addFavoriteService,
  removeFavoriteService
} from "../../store/thunks/FavouriteServiceThunk.js";

import ServiceProviderCard from "../../components/serviceProvider/ServiceProviderCard.jsx";
import Loader from "../../components/common/Loader.jsx";

const ServiceProvidersList = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector((state) => state.serviceProvider);
  const { favorites } = useSelector((state) => state.favoriteServices);

  const [filters, setFilters] = useState({
    rating: "",
    service: "",
    city: "",
    search: ""
  });

  // Convert favorites to Set for fast lookup
  const favoriteProviderIds = new Set(
    favorites.map(fav =>
      typeof fav.serviceProviderId === "string"
        ? fav.serviceProviderId
        : fav.serviceProviderId?._id
    )
  );

  // Fetch providers with debounce
  const fetchProviders = useCallback(
    debounce((currentFilters) => {
      const queryParams = new URLSearchParams();
      Object.entries(currentFilters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });
      dispatch(getAllApprovedProviders(`?${queryParams.toString()}`));
    }, 500),
    []
  );

  // Fetch favorites on mount
  useEffect(() => {
    dispatch(fetchFavoriteServices());
  }, [dispatch]);

  // Fetch providers based on filters
  useEffect(() => {
    fetchProviders(filters);
    return fetchProviders.cancel;
  }, [filters]);

  // Error toast
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleFavorite = async (providerId) => {
    try {
      if (favoriteProviderIds.has(providerId)) {
        await dispatch(removeFavoriteService(providerId)).unwrap();
        toast.success("Removed from favorites");
      } else {
        await dispatch(addFavoriteService(providerId)).unwrap();
        toast.success("Added to favorites");
      }

      // Refresh favorite list
      dispatch(fetchFavoriteServices());
    } catch (err) {
      toast.error("Could not update favorite status");
    }
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
              value={filters.search}
              onChange={handleChange}
              className="filter-input"
            />

            <select
              name="service"
              value={filters.service}
              onChange={handleChange}
              className="filter-input"
            >
              <option value="">All Services</option>
              {["Plumbing", "Painting", "Electrical", "Renovation", "Interior Design", "Cleaning", "Architecture", "Furniture", "Other"]
                .map(service => (
                  <option key={service} value={service}>{service}</option>
              ))}
            </select>

            <input
              name="city"
              type="text"
              placeholder="City"
              value={filters.city}
              onChange={handleChange}
              className="filter-input"
            />

            <select
              name="rating"
              value={filters.rating}
              onChange={handleChange}
              className="filter-input"
            >
              <option value="">Min Rating</option>
              {[5, 4, 3, 2, 1].map(r => (
                <option key={r} value={r}>
                  {r} ⭐ {r !== 5 && " & up"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Providers or Loading State */}
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
            {providers.map(provider => (
              <ServiceProviderCard
                key={provider._id}
                provider={provider}
                isFavorited={favoriteProviderIds.has(provider._id)}
                onToggleFavorite={() => handleToggleFavorite(provider._id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceProvidersList;
