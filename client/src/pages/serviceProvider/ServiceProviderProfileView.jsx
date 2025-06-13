import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyServiceProvider, deleteServiceProvider } from "../../store/thunks/ServiceProviderThunk.js";
import { FaMapMarkerAlt, FaCheckCircle, FaEdit, FaTrashAlt, FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/common/Loader.jsx";
import RequestBell from "../../components/common/RequestBell.jsx";

const ServiceProviderProfileView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myProfile, loading, error } = useSelector((state) => state.serviceProvider);

    useEffect(() => {
        dispatch(getMyServiceProvider());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your service profile?")) {
            dispatch(deleteServiceProvider());
            navigate("/services");
        }
    };

    if (loading || !myProfile) {
        return (
            <div className="flex justify-center items-center h-48 text-lg text-gray-500 dark:text-gray-300">
                <Loader />
            </div>
        );
    }

    const {
        businessName,
        description,
        address,
        servicesOffered,
        location,
        image,
        isApproved,
        isFeatured,
    } = myProfile;

    return (
        <section className="max-w-5xl mx-auto my-12 p-8 rounded-3xl shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Profile Image */}
                <div className="rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 shadow-lg flex-shrink-0">
                    <img
                        src={image || "/default-service.jpg"}
                        alt={businessName}
                        className="w-48 h-48 rounded-full object-cover border-4 border-white dark:border-gray-800"
                    />
                </div>

                {/* Profile Details */}
                <div className="flex-1 flex flex-col justify-between w-full">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 flex items-center gap-3">
                            {businessName}
                            {isApproved && <FaCheckCircle className="text-green-500" title="Approved" />}
                            {isFeatured && (
                                <span className="flex items-center gap-1 bg-yellow-400/80 text-yellow-900 font-semibold text-sm rounded-full px-3 py-1 shadow-md">
                                    <FaStar /> Featured
                                </span>
                            )}
                        </h2>

                        {/* 🔔 Notification Bell */}
                        <RequestBell />
                    </div>

                    <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {description}
                    </p>

                    <p className="mt-6 flex items-center gap-3 text-gray-600 dark:text-gray-400 font-medium">
                        <FaMapMarkerAlt className="text-red-500" />
                        {address}
                    </p>

                    {servicesOffered?.length > 0 && (
                        <div className="mt-6">
                            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                                Services Offered
                            </h4>
                            <ul className="flex flex-wrap gap-3">
                                {servicesOffered.map((service) => (
                                    <li
                                        key={service}
                                        className="px-4 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 rounded-full font-medium text-sm shadow-sm"
                                    >
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {location?.lat && location?.lng && (
                        <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 font-mono tracking-wide select-text">
                            Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                        </p>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            to="/update-service-profile"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-purple-300"
                        >
                            <FaEdit />
                            <span>Edit Profile</span>
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 hover:scale-105 transition focus:outline-none focus:ring-4 focus:ring-red-300"
                        >
                            <FaTrashAlt />
                            <span>Delete Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceProviderProfileView
