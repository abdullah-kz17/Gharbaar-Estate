import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

const ServiceProviderCard = ({ provider, isFavorited = false, onToggleFavorite }) => {
    const [isToggling, setIsToggling] = React.useState(false);

    const {
        _id,
        businessName,
        description,
        address,
        image,
        servicesOffered = [],
        averageRating = 0,
        isFeatured = false,
    } = provider;

    const handleFavoriteToggle = async () => {
        if (!onToggleFavorite) return;
        setIsToggling(true);
        await onToggleFavorite();
        setIsToggling(false);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400" />);
        }
        if (hasHalf) {
            stars.push(<FaStar key="half" className="text-yellow-300 opacity-50" />);
        }

        return stars;
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
            {/* 🌟 Featured Badge */}
            {isFeatured && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                    ⭐ Featured
                </div>
            )}

            {/* ❤️ Favorite Button */}
            <button
                onClick={handleFavoriteToggle}
                className="absolute top-3 right-3 text-red-500 text-lg z-10"
                title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                disabled={isToggling}
            >
                {isToggling ? (
                    <span className="animate-spin">⏳</span>
                ) : isFavorited ? (
                    <FaHeart />
                ) : (
                    <FaRegHeart />
                )}
            </button>

            <Link to={`/providers/${_id}`}>
                <img
                    src={image || "/default-business.jpg"}
                    alt={businessName}
                    className="w-full h-48 object-cover"
                />
            </Link>

            <div className="p-4">
                <Link to={`/providers/${_id}`} className="hover:underline">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">{businessName}</h3>
                </Link>

                <div className="flex items-center mt-1">
                    {renderStars(averageRating)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        {averageRating.toFixed(1)} / 5
                    </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{description}</p>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <FaMapMarkerAlt className="mr-1 text-blue-500" />
                    <span>{address}</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {servicesOffered.map((service) => (
                        <span
                            key={service}
                            className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-medium"
                        >
                            {service}
                        </span>
                    ))}
                </div>

                <div className="mt-4 text-right">
                    <Link
                        to={`/providers/${_id}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium text-sm"
                    >
                        View Details →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceProviderCard;
