import React, { useState } from "react";
import {
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaToolbox,
    FaStar,
    FaWhatsapp,
    FaHeart,
    FaShare,
    FaCheckCircle,
    FaCalendarAlt,
    FaUserCircle,
    FaStarHalfAlt
} from "react-icons/fa";

const ServiceProviderDetailCard = ({ provider }) => {
    const {
        user,
        businessName,
        description,
        address,
        servicesOffered,
        image,
        averageRating = 0
    } = provider;

    const [showFullDescription, setShowFullDescription] = useState(false);

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FaStar
                    key={`full-${i}`}
                    className="text-yellow-400 drop-shadow-sm animate-pulse"
                />
            );
        }

        // Half star
        if (hasHalf) {
            stars.push(
                <FaStarHalfAlt
                    key="half"
                    className="text-yellow-400 drop-shadow-sm"
                />
            );
        }

        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <FaStar
                    key={`empty-${i}`}
                    className="text-gray-300"
                />
            );
        }

        return stars;
    };

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800";
    };

    const handleProfileError = (e) => {
        e.target.onerror = null;
        e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150";
    };

    return (
        <div className="relative max-w-7xl mx-auto">
            {/* Gradient Background Blur */}
            <div className="absolute rounded-2xl blur opacity-25 animate-pulse"></div>

            <div className="relative bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/20">

                {/* Top Image Banner */}
                <div className="relative h-72 overflow-hidden">
                    <img
                        src={image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800"}
                        alt={businessName}
                        className="w-full h-full object-fill transition-transform duration-700 hover:scale-105"
                        onError={handleImageError}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Business Info Overlay */}
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="flex items-end justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                                    {businessName}
                                </h1>
                                {averageRating > 0 && (
                                    <div className="flex items-center space-x-1 mb-2">
                                        <div className="flex space-x-1">
                                            {renderStars(averageRating)}
                                        </div>
                                        <span className="text-yellow-300 font-semibold ml-2 drop-shadow">
                                            {averageRating.toFixed(1)}
                                        </span>
                                        <span className="text-white/80 text-sm">/ 5.0</span>
                                    </div>
                                )}
                                <div className="flex items-center text-white/90 text-sm">
                                    <FaCheckCircle className="mr-2 text-green-400" />
                                    <span>Verified Provider</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-8">

                    {/* About Section */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            About Our Service
                        </h2>
                        <div className="relative">
                            <p className={`text-gray-700 leading-relaxed transition-all duration-300 ${
                                showFullDescription ? '' : 'line-clamp-3'
                            }`}>
                                {description || "Professional service provider committed to delivering exceptional results with years of experience and dedication to customer satisfaction."}
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
                    </div>

                    {/* Services Offered */}
                    {servicesOffered?.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent flex items-center">
                                <FaToolbox className="mr-2 text-yellow-500" />
                                Services Offered
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {servicesOffered.map((service, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 hover:shadow-md hover:scale-102 transition-all duration-200"
                                    >
                                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                                        <span className="text-gray-800 font-medium">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Contact Information
                        </h3>

                        {/* Location */}
                        <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                            <div className="flex items-center">
                                <div className="p-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white mr-4">
                                    <FaMapMarkerAlt className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Location</div>
                                    <div className="font-semibold text-gray-800">{address}</div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {user?.phone ? (
                                <>
                                    <a
                                        href={`tel:${user.phone}`}
                                        className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 group"
                                    >
                                        <FaPhone className="group-hover:scale-110 transition-transform duration-300" />
                                        <div className="text-left">
                                            <div className="font-semibold">Call Now</div>
                                            <div className="text-xs opacity-90">{user.phone}</div>
                                        </div>
                                    </a>
                                    <a
                                        href={`https://wa.me/${user.phone.replace('+', '')}`}
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

                            {user?.email ? (
                                <a
                                    href={`mailto:${user.email}`}
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

                    {/* Service Provider Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                            Service Provider
                        </h3>
                        <div className="flex items-center p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                            <div className="relative">
                                <img
                                    src={user?.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"}
                                    alt={user?.username}
                                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                    onError={handleProfileError}
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <FaCheckCircle className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <div className="ml-6 flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-gray-800 text-lg">{user?.username}</h4>
                                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-medium">
                                        Verified
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1">Professional Service Provider</p>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>Available for booking</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                                    {averageRating > 0 ? averageRating.toFixed(1) : 'New'}
                                </div>
                                <div className="text-xs text-gray-500">Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    {/*<div className="grid grid-cols-2 gap-4">*/}
                    {/*    <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">*/}
                    {/*        <FaCalendarAlt />*/}
                    {/*        <span className="font-medium">Book Service</span>*/}
                    {/*    </button>*/}
                    {/*    <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">*/}
                    {/*        <FaUserCircle />*/}
                    {/*        <span className="font-medium">View Profile</span>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default ServiceProviderDetailCard