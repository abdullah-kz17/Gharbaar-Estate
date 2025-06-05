import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFavorites } from "../../../store/thunks/FavouriteThunk.js";
import PropertyCard from "../../../components/listings/PropertyCard.jsx";
import { FaRegHeart } from "react-icons/fa";
import Loader from "../../../components/common/Loader.jsx";

const Favorites = () => {
    const dispatch = useDispatch();
    const { favorites, loading, error } = useSelector((state) => state.favorite);

    useEffect(() => {
        dispatch(getUserFavorites());
    }, [dispatch]);

    if (loading) return <div className="py-20 flex justify-center"><Loader /></div>;

    if (error)
        return (
            <p className="text-center text-red-500 py-10 text-lg font-medium">
                {error}
            </p>
        );

    if (!favorites.length)
        return (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center">
                <FaRegHeart className="text-4xl mb-4 text-indigo-400" />
                <p className="text-lg font-medium">
                    You haven't added any favorite properties yet.
                </p>
            </div>
        );

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                My Favorite Properties
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {favorites.map((fav) =>
                    fav.propertyId ? (
                        <PropertyCard
                            key={fav.propertyId._id}
                            property={fav.propertyId}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default Favorites;
