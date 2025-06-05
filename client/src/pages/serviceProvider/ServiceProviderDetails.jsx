import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getServiceProviderById, getReviewsForProvider } from "../../store/thunks/serviceProviderThunk";
import ServiceProviderDetailCard from "../../components/serviceProvider/ServiceProviderDetailCard.jsx";
import ReviewForm from "../../components/reviews/ReviewForm.jsx";
import ReviewList from "../../components/reviews/ReviewList.jsx";
import Loader from "../../components/common/Loader.jsx";

const ServiceProviderDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { selectedProvider, loading, error } = useSelector((state) => state.serviceProvider);
    const [editReview, setEditReview] = useState(null);

    // Fetch provider and reviews on mount
    useEffect(() => {
        if (id) {
            dispatch(getServiceProviderById(id));
            dispatch(getReviewsForProvider(id));
        }
    }, [dispatch, id]);

    // Handle error toast
    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleEdit = (review) => setEditReview(review);
    const clearEdit = () => setEditReview(null);

    // Loader
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950 transition-all">
                <div className="text-gray-700 dark:text-gray-300 text-xl animate-pulse">
                    <Loader />
                </div>
            </div>
        );
    }

    // Fallback if no provider found
    if (!selectedProvider) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950 transition-all">
                <p className="text-red-500 dark:text-red-400 text-lg">
                    Provider not found.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 px-4 py-10 transition-all duration-300">
            <div className="max-w-5xl mx-auto space-y-10">
                <ServiceProviderDetailCard provider={selectedProvider} />

                <div className="p-8 bg-white/90 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden border border-white/20 dark:border-gray-700">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                        Customer Reviews
                    </h2>
                    <ReviewForm providerId={id} existingReview={editReview} onFinish={clearEdit} />
                    <ReviewList onEdit={handleEdit} providerId={id} />
                </div>
            </div>
        </div>
    );
};

export default ServiceProviderDetailPage;
