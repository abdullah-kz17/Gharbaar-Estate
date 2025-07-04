import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
import Pagination from '../../components/common/Pagination.jsx';
import PageHeader from '../../components/common/PageHeader';

const ServiceProvidersList = () => {
  const dispatch = useDispatch();
  const { providers, loading, error, page, totalPages } = useSelector((state) => state.serviceProvider);
  const { favorites } = useSelector((state) => state.favoriteServices);

  const [filters, setFilters] = useState({
    rating: "",
    service: "",
    city: "",
    search: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  // Convert favorites to Set for fast lookup
  const favoriteProviderIds = new Set(
    favorites.map(fav =>
      typeof fav.serviceProviderId === "string"
        ? fav.serviceProviderId
        : fav.serviceProviderId?._id
    )
  );

  // Fetch favorites on mount
  useEffect(() => {
    dispatch(fetchFavoriteServices());
  }, [dispatch]);

  // Fetch providers based on filters and page
  useEffect(() => {
    dispatch(getAllApprovedProviders({ page: currentPage, limit, ...filters }));
  }, [filters, currentPage, dispatch]);

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
    } catch {
      toast.error("Could not update favorite status");
    }
  };

  return (
    <>
      <PageHeader
        title="Find Trusted Service Providers"
        subtitle="Browse, search, and connect with top-rated professionals for your home and property needs."
        backgroundImage="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1500&q=80"
      />
      <section className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
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
            <>
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
              <Pagination
                currentPage={page}
                totalPages={totalPages || 1}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ServiceProvidersList;
