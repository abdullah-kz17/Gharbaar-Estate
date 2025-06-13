import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar, FaHeart, FaRegHeart, FaEnvelope } from "react-icons/fa";
import RequestFormModal from "./RequestServiceFormModal.jsx";

const ServiceProviderCard = ({
                                 provider,
                                 isFavorited = false,
                                 onToggleFavorite,
                             }) => {
    const [isToggling, setIsToggling] = useState(false);
    const [showModal, setShowModal] = useState(false);

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

    const handleFavorite = async () => {
        setIsToggling(true);
        await onToggleFavorite();
        setIsToggling(false);
    };

    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        return (
            <>
                {[...Array(full)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                ))}
                {half && <FaStar className="text-yellow-300 opacity-50" />}
            </>
        );
    };

    return (
        <>
            <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                {isFeatured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                        ⭐ Featured
                    </div>
                )}

                <button
                    onClick={handleFavorite}
                    className="absolute top-3 right-3 text-red-500 text-lg z-10"
                    title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                    disabled={isToggling}
                >
                    {isToggling ? <span className="animate-spin">⏳</span> :
                        isFavorited ? <FaHeart /> : <FaRegHeart />}
                </button>

                <img
                    src={image || "/default-business.jpg"}
                    alt={businessName}
                    className="w-full h-48 object-cover"
                />

                <div className="p-4 flex flex-col gap-2">
                    <Link to={`/providers/${_id}`} className="hover:underline">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                            {businessName}
                        </h3>
                    </Link>

                    <div className="flex items-center mt-1">
                        {renderStars(averageRating)}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              {averageRating.toFixed(1)} / 5
            </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <FaMapMarkerAlt className="mr-1 text-blue-500" />
                        <span>{address}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {servicesOffered.map((service) => (
                            <span
                                key={service}
                                className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-800 dark:to-purple-800 text-indigo-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs font-medium"
                            >
                {service}
              </span>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow hover:scale-105 transition-transform"
                        >
                            <FaEnvelope />
                            Request Service
                        </button>
                        <Link
                            to={`/providers/${_id}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                        >
                            View Details →
                        </Link>
                    </div>
                </div>
            </div>

            {showModal && (
                <RequestFormModal
                    providerId={_id}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default ServiceProviderCard;
