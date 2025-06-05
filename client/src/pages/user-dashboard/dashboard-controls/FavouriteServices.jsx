import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteServices } from "../../../store/thunks/FavouriteServiceThunk.js";
import ServiceProviderCard from "../../../components/serviceProvider/ServiceProviderCard.jsx";
import { FaStar } from "react-icons/fa";
import Loader from "../../../components/common/Loader.jsx";

const FavoriteServices = () => {
    const dispatch = useDispatch();
    const { favorites, loading, error } = useSelector(
        (state) => state.favoriteServices
    );

    useEffect(() => {
        dispatch(fetchFavoriteServices());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-50">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    Your Favorite Services
                </h2>
                <p className="text-gray-500 mt-2">Easily access the services you love most</p>
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
                <div className="text-center text-gray-500 col-span-full py-20 flex flex-col items-center">
                    <FaStar className="text-4xl text-indigo-400 mb-4" />
                    <p className="text-lg font-medium">You haven't liked any services yet.</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((fav) =>
                    fav.serviceProviderId ? (
                        <ServiceProviderCard
                            key={fav._id}
                            provider={fav.serviceProviderId}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default FavoriteServices;
