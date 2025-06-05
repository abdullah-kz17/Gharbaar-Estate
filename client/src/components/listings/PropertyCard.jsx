import React, { useEffect, useState } from "react";
import {
    FaHeart,
    FaRegHeart,
    FaMapMarkerAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaEye,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    addToFavorites,
    removeFromFavorites,
} from "../../store/thunks/FavouriteThunk.js";
import { toast } from "react-toastify";

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { favorites } = useSelector((state) => state.favorite);

    // Determine if the property is favorited (updated when favorites change)
    const isFavorite = favorites?.some(
        (fav) => fav.propertyId?._id === property?._id
    );

    // Local liked state synced to global favorites state
    const [liked, setLiked] = useState(isFavorite);

    useEffect(() => {
        setLiked(isFavorite);
    }, [isFavorite]);

    const handleToggleFavorite = async () => {
        try {
            if (liked) {
                await dispatch(removeFromFavorites(property._id)).unwrap();
                toast.info("Removed from favorites");
                setLiked(false); // Update only on success
            } else {
                await dispatch(addToFavorites(property._id)).unwrap();
                toast.success("Added to favorites");
                setLiked(true); // Update only on success
            }
        } catch (error) {
            toast.error(error || "Failed to update favorites");
        }
    };

    const handleView = () => navigate(`/property/${property._id}`);

    // Normalize image for the card (handle string or array, possibly comma-separated)
    let mainImage = "/placeholder.jpg";

    if (property.images) {
        if (Array.isArray(property.images)) {
            if (
                property.images.length === 1 &&
                typeof property.images[0] === "string" &&
                property.images[0].includes(",")
            ) {
                mainImage = property.images[0].split(",")[0].trim();
            } else if (property.images.length > 0) {
                mainImage = property.images[0];
            }
        } else if (typeof property.images === "string") {
            mainImage = property.images.split(",")[0].trim();
        }
    }

    return (
        <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border">
            <div className="relative group">
                {/* 🏷️ Featured Badge */}
                {property.isFeatured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
                        🌟 Featured
                    </div>
                )}

                <img
                    src={mainImage}
                    alt={property.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.jpg";
                    }}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-2 right-2 flex gap-2">
                    <button
                        onClick={handleToggleFavorite}
                        className="bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-100"
                        aria-label="Toggle Favorite"
                    >
                        {liked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                    </button>

                    <button
                        onClick={handleView}
                        className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:bg-gray-100"
                        aria-label="View Details"
                    >
                        <FaEye size={18} />
                    </button>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">{property.name}</h2>
                    <span className="text-blue-600 font-bold text-sm">
                        PKR {property.price?.toLocaleString()}
                    </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 gap-2 mb-2">
                    <FaMapMarkerAlt />
                    <span className="truncate">{property.location?.address}</span>
                </div>

                <div className="flex justify-between text-gray-700 text-sm border-t pt-2">
                    <div className="flex items-center gap-1">
                        <FaRulerCombined /> <span>{property.area}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaBed /> <span>{property.rooms?.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaBath /> <span>{property.rooms?.baths}</span>
                    </div>
                </div>

                {property.features?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                        {property.features.slice(0, 3).map((feature, i) => (
                            <span
                                key={i}
                                className="bg-gray-100 px-2 py-1 rounded-full truncate max-w-[100px]"
                            >
                                {feature}
                            </span>
                        ))}
                        {property.features.length > 3 && (
                            <span className="text-gray-400">+{property.features.length - 3} more</span>
                        )}
                    </div>
                )}

                {property.realtorId?.name && (
                    <p className="text-xs text-gray-500 mt-3">Listed by: {property.realtorId.name}</p>
                )}
            </div>
        </div>
    );
};

export default PropertyCard;
