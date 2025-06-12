import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserFavorites,
    removeFromFavorites,
} from "../../../store/thunks/FavouriteThunk.js";
import PropertyCard from "../../../components/listings/PropertyCard.jsx";
import { FaRegHeart } from "react-icons/fa";
import Loader from "../../../components/common/Loader.jsx";
import { toast } from "react-toastify";

const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites, loading, error } = useSelector((state) => state.favorite);

    useEffect(() => {
        dispatch(getUserFavorites());
    }, [dispatch]);

    const handleToggleFavorite = async (propertyId) => {
        if (!propertyId) return;

        try {
            await dispatch(removeFromFavorites(propertyId)).unwrap();
            // Refresh the favorites list after removal
            dispatch(getUserFavorites());
        } catch (error) {
            toast.error(error?.message || "Failed to remove from favorites");
            console.error("Remove favorite error:", error);
        }
    };

    if (loading) {
        return (
            <div className="p-6 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    My Favorite Properties
                </h1>
                <div className="py-20 flex justify-center">
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    My Favorite Properties
                </h1>
                <p className="text-center text-red-500 py-10 text-lg font-medium">
                    {error}
                </p>
            </div>
        );
    }

    if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
        return (
            <div className="p-6 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    My Favorite Properties
                </h1>
                <div className="text-center py-20 text-gray-500 flex flex-col items-center">
                    <FaRegHeart className="text-4xl mb-4 text-indigo-400" />
                    <p className="text-lg font-medium">
                        You haven't added any favorite properties yet.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Browse properties and click the heart icon to add them to your favorites.
                    </p>
                </div>
            </div>
        );
    }

    // Filter out favorites with null/undefined propertyId
    const validFavorites = favorites.filter(fav => fav?.propertyId?._id);

    if (validFavorites.length === 0) {
        return (
            <div className="p-6 max-w-7xl mx-auto min-h-screen">
                <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    My Favorite Properties
                </h1>
                <div className="text-center py-20 text-gray-500 flex flex-col items-center">
                    <FaRegHeart className="text-4xl mb-4 text-indigo-400" />
                    <p className="text-lg font-medium">
                        Some of your favorite properties are no longer available.
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Browse properties and add new ones to your favorites.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                My Favorite Properties
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {validFavorites.map((fav) => (
                    <PropertyCard
                        key={fav.propertyId._id}
                        property={fav.propertyId}
                        isFavorited={true}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;