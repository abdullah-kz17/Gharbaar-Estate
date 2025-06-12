import React, { useState, useEffect } from "react";
import {
    FaHeart, FaRegHeart, FaMapMarkerAlt,
    FaBed, FaBath, FaRulerCombined, FaEye, FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../store/thunks/FavouriteThunk.js";
import { toast } from "react-toastify";

const PropertyCard = ({ property, isFavorited: propIsFavorited, onToggleFavorite }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favorite);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isToggling, setIsToggling] = useState(false);

    // Calculate if property is favorited from Redux state or prop
    useEffect(() => {
        if (!property?._id) return;

        // Check from Redux state first, then fallback to prop
        const isInFavorites = favorites?.some(fav =>
            fav?.propertyId?._id === property._id || fav?._id === property._id
        );

        setIsFavorite(isInFavorites || propIsFavorited || false);
    }, [favorites, propIsFavorited, property?._id]);

    const handleToggleFavorite = async (e) => {
        e.stopPropagation(); // Prevent event bubbling

        if (!property?._id || isToggling) return;

        setIsToggling(true);

        try {
            if (isFavorite) {
                const res = await dispatch(removeFromFavorites(property._id)).unwrap();
                setIsFavorite(false);
                toast.info(res?.message || "Removed from favorites");
            } else {
                const res = await dispatch(addToFavorites(property._id)).unwrap();
                setIsFavorite(true);
                toast.success(res?.message || "Added to favorites");
            }

            // Call parent callback if provided
            if (onToggleFavorite) {
                onToggleFavorite(property._id);
            }
        } catch (error) {
            toast.error(error?.message || "Failed to update favorites");
            console.error("Toggle favorite error:", error);
        } finally {
            setIsToggling(false);
        }
    };

    const handleView = () => {
        if (property?._id) {
            navigate(`/property/${property._id}`);
        }
    };

    // Normalize image with better error handling
    let mainImage = "/placeholder.jpg";
    if (property?.images) {
        try {
            if (Array.isArray(property.images)) {
                const firstImage = property.images[0];
                if (firstImage) {
                    mainImage = typeof firstImage === 'string'
                        ? firstImage.split(",")[0]?.trim() || mainImage
                        : mainImage;
                }
            } else if (typeof property.images === "string") {
                mainImage = property.images.split(",")[0]?.trim() || mainImage;
            }
        } catch (error) {
            console.warn("Error processing property images:", error);
        }
    }

    // Safety check for property data
    if (!property) {
        return null;
    }

    return (
        <div className="group bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-500 hover:-translate-y-1">
            <div className="relative overflow-hidden">
                {property.isFeatured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm z-10 flex items-center gap-1">
                        <FaStar size={12} />
                        Featured
                    </div>
                )}

                <img
                    src={mainImage}
                    alt={property.name || "Property"}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.jpg";
                    }}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <button
                        onClick={handleToggleFavorite}
                        disabled={isToggling}
                        className={`p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isFavorite
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-white/90 dark:bg-gray-800/90 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700"
                        }`}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                    </button>

                    <button
                        onClick={handleView}
                        className="p-2.5 rounded-full shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:scale-110"
                        aria-label="View Details"
                    >
                        <FaEye size={16} />
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h2
                        className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                        onClick={handleView}
                    >
                        {property.name || "Unnamed Property"}
                    </h2>
                    <div className="flex flex-col items-end ml-3">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            PKR {property.price?.toLocaleString() || "N/A"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 gap-2 mb-4 group/location">
                    <FaMapMarkerAlt className="text-indigo-500 dark:text-indigo-400 flex-shrink-0 group-hover/location:scale-110 transition-transform duration-200" />
                    <span className="truncate text-sm font-medium">
                        {property.location?.address || "Location not specified"}
                    </span>
                </div>

                <div className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <FaRulerCombined className="text-indigo-600 dark:text-indigo-400" size={14} />
                        </div>
                        <div>
                            <span className="text-sm font-semibold">{property.area || "N/A"}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Area</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <FaBed className="text-purple-600 dark:text-purple-400" size={14} />
                        </div>
                        <div>
                            <span className="text-sm font-semibold">{property.rooms?.beds || "N/A"}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Beds</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <FaBath className="text-blue-600 dark:text-blue-400" size={14} />
                        </div>
                        <div>
                            <span className="text-sm font-semibold">{property.rooms?.baths || "N/A"}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Baths</p>
                        </div>
                    </div>
                </div>

                {property.features?.length > 0 && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {property.features.slice(0, 3).map((feature, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full border border-indigo-200 dark:border-indigo-700/50 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-colors duration-200"
                                >
                                    {feature}
                                </span>
                            ))}
                            {property.features.length > 3 && (
                                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                                    +{property.features.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {property.realtorId?.name && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium text-gray-900 dark:text-white">Listed by:</span> {property.realtorId.name}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyCard;