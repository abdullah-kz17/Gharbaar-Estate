import React, { useState } from "react";
import {
    FaBath,
    FaBed,
    FaMapMarkerAlt,
    FaRulerCombined,
    FaPhoneAlt,
    FaEnvelope,
    FaWhatsapp,
    FaHeart,
    FaShare,
    FaEye, FaPhone
} from "react-icons/fa";

const PropertyDetailCard = ({ property }) => {
    const {
        name,
        description,
        price,
        area,
        location,
        rooms,
        features,
        amenities,
        images,
        contactInfo,
        isFeatured,
        renovationRequired
    } = property;

    // Normalize images
    let normalizedImages = [];
    if (Array.isArray(images)) {
        if (images.length === 1 && typeof images[0] === "string" && images[0].includes(",")) {
            normalizedImages = images[0].split(",").map(url => url.trim());
        } else {
            normalizedImages = images.map(url => url.trim());
        }
    } else if (typeof images === "string") {
        normalizedImages = images.split(",").map(url => url.trim());
    }

    const [mainImage, setMainImage] = useState(normalizedImages[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800");
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";
    };

    return (
        <div className="relative max-w-7xl mx-auto">
            {/* Gradient Background Blur */}
            <div className="absolute  rounded-2xl blur opacity-25 animate-pulse"></div>

            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-300 shadow-lg shadow-black/50">

                {/* Featured Badge */}
                {isFeatured && (
                    <div className="absolute top-4 left-4 z-10">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                            ⭐ Featured
                        </div>
                    </div>
                )}

                {/* Image Gallery */}
                <div className="relative">
                    <div className="relative overflow-hidden">
                        <img
                            src={mainImage}
                            alt="Main"
                            className="w-full h-80 sm:h-96 object-fill transition-transform duration-700 hover:scale-105"
                            onError={handleImageError}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                    </div>

                    {normalizedImages.length > 1 && (
                        <div className="flex gap-3 p-4 overflow-x-auto bg-gradient-to-r from-gray-50 to-gray-100">
                            {normalizedImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 ${
                                        mainImage === img ? 'ring-3 ring-purple-500 shadow-lg shadow-purple-500/25' : ''
                                    }`}
                                    onClick={() => setMainImage(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumb-${idx}`}
                                        className="h-20 w-28 object-cover rounded-xl"
                                        onError={handleImageError}
                                    />
                                    {mainImage === img && (
                                        <div className="absolute inset-0 bg-purple-500/20 rounded-xl"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                    {/* Title and Price */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                                {name}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-600">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span>{location?.address}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                PKR {price}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Negotiable</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <p className={`text-gray-700 leading-relaxed transition-all duration-300 ${
                            showFullDescription ? '' : 'line-clamp-3'
                        }`}>
                            {description}
                        </p>
                        {description && description.length > 150 && (
                            <button
                                onClick={() => setShowFullDescription(!showFullDescription)}
                                className="text-purple-600 hover:text-purple-800 font-medium mt-2 transition-colors duration-200"
                            >
                                {showFullDescription ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>

                    {/* Property Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: FaRulerCombined, label: 'Area', value: area, color: 'blue' },
                            { icon: FaBed, label: 'Bedrooms', value: `${rooms?.beds} Beds`, color: 'purple' },
                            { icon: FaBath, label: 'Bathrooms', value: `${rooms?.baths} Baths`, color: 'pink' },
                            { icon: FaMapMarkerAlt, label: 'Location', value: location?.address || 'N/A', color: 'green' }
                        ].map((stat, idx) => (
                            <div key={idx} className="group">
                                <div className={`p-4 rounded-xl bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border border-${stat.color}-200 hover:shadow-lg hover:shadow-${stat.color}-500/10 transition-all duration-300 hover:-translate-y-1`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 text-white group-hover:scale-110 transition-transform duration-300`}>
                                            <stat.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">{stat.label}</div>
                                            <div className="font-semibold text-gray-800">{stat.value}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features and Amenities */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {features?.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    ✨ Features
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {features.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 rounded-full border border-blue-200 hover:shadow-md hover:scale-105 transition-all duration-200 text-sm font-medium"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {amenities?.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                                    🏠 Amenities
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {amenities.map((amenity, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 text-green-700 rounded-full border border-green-200 hover:shadow-md hover:scale-105 transition-all duration-200 text-sm font-medium"
                                        >
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Renovation Status */}
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold text-gray-800">🔧 Renovation Status</h3>
                        <div className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm ${
                            renovationRequired
                                ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-200'
                                : 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200'
                        }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                                renovationRequired ? 'bg-red-500' : 'bg-green-500'
                            }`}></span>
                            {renovationRequired ? "Renovation Required" : "Move-in Ready"}
                        </div>
                    </div>

                    {/* Contact Section */}
                    {contactInfo && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                📞 Contact Information
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {contactInfo?.phone ? (
                                    <>
                                        <a
                                            href={`tel:${contactInfo.phone}`}
                                            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 group"
                                        >
                                            <FaPhone className="group-hover:scale-110 transition-transform duration-300" />
                                            <div className="text-left">
                                                <div className="font-semibold">Call Now</div>
                                                <div className="text-xs opacity-90">{contactInfo.phone}</div>
                                            </div>
                                        </a>
                                        <a
                                            href={`https://wa.me/${contactInfo.phone.replace('+', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-1 group"
                                        >
                                            <FaWhatsapp className="group-hover:scale-110 transition-transform duration-300" />
                                            <div className="text-left">
                                                <div className="font-semibold">WhatsApp</div>
                                                <div className="text-xs opacity-90">Quick Chat</div>
                                            </div>
                                        </a>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center p-4 bg-gray-100 text-gray-500 rounded-xl border-2 border-dashed border-gray-300 col-span-2">
                                        <span className="text-sm">No phone number provided</span>
                                    </div>
                                )}

                                {contactInfo?.email ? (
                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 group"
                                    >
                                        <FaEnvelope className="group-hover:scale-110 transition-transform duration-300" />
                                        <div className="text-left">
                                            <div className="font-semibold">Email</div>
                                            <div className="text-xs opacity-90">Send Message</div>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="flex items-center justify-center p-4 bg-gray-100 text-gray-500 rounded-xl border-2 border-dashed border-gray-300">
                                        <span className="text-sm">No email provided</span>
                                    </div>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailCard