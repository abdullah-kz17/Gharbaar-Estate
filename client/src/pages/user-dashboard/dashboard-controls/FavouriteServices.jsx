import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFavoriteServices,
    addFavoriteService,
    removeFavoriteService
} from "../../../store/thunks/FavouriteServiceThunk.js";
import ServiceProviderCard from "../../../components/serviceProvider/ServiceProviderCard.jsx";
import { FaStar } from "react-icons/fa";
import Loader from "../../../components/common/Loader.jsx";
import { toast } from "react-toastify";

const FavoriteServices = () => {
    const dispatch = useDispatch();
    const { favorites, loading, error } = useSelector(state => state.favoriteServices);

    // Build a Set of favorited provider IDs
    const favoriteIds = new Set(
        favorites.map(fav =>
            typeof fav.serviceProviderId === "string"
                ? fav.serviceProviderId
                : fav.serviceProviderId?._id
        )
    );

    useEffect(() => {
        dispatch(fetchFavoriteServices());
    }, [dispatch]);

    const handleToggleFavorite = async (providerId) => {
        if (favoriteIds.has(providerId)) {
            try {
                await dispatch(removeFavoriteService(providerId)).unwrap();
                toast.success("Removed from favorites");
                dispatch(fetchFavoriteServices()); // Refresh list
            } catch (err) {
                toast.error("Failed to remove from favorites");
            }
        } else {
            try {
                await dispatch(addFavoriteService({ serviceProviderId: providerId })).unwrap();
                toast.success("Added to favorites");
                dispatch(fetchFavoriteServices()); // Refresh list
            } catch (err) {
                toast.error("Failed to add to favorites");
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Your Favorite Services
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Easily access the services you love most
                </p>
            </div>

            {loading && (
                <div className="flex justify-center py-20">
                    <Loader />
                </div>
            )}

            {error && (
                <p className="text-center text-red-500 font-medium py-4">{error}</p>
            )}

            {!loading && favorites.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 col-span-full py-20 flex flex-col items-center">
                    <FaStar className="text-4xl text-indigo-400 mb-4" />
                    <p className="text-lg font-medium">You haven't liked any services yet.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((fav) => {
                    const provider = fav.serviceProviderId;
                    if (!provider) return null;

                    const isFavorited = favoriteIds.has(provider._id);

                    return (
                        <ServiceProviderCard
                            key={provider._id}
                            provider={provider}
                            isFavorited={isFavorited}
                            onToggleFavorite={() => handleToggleFavorite(provider._id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FavoriteServices;
