import React, { useState } from "react";
import { FaStar, FaTrashAlt, FaEdit, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../../store/thunks/ServiceProviderThunk.js";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";
import ReviewForm from "./ReviewForm";

const ReviewList = ({ providerId }) => {
    const { reviews } = useSelector(state => state.serviceProvider);
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [editingReview, setEditingReview] = useState(null);

    const handleDelete = async (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            try {
                await dispatch(deleteReview({ providerId, reviewId })).unwrap();
                toast.success("Review deleted successfully");
            } catch {
                toast.error("Failed to delete review");
            }
        }
    };

    const handleEdit = (review) => {
        setEditingReview(review);
    };

    const handleEditFinish = () => {
        setEditingReview(null);
    };

    return (
        <div className="space-y-6">
            {reviews.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <FaStar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your experience!</p>
                </div>
            ) : (
                reviews.map((review) => {
                    if (!review || typeof review.rating !== "number") return null;

                    return (
                        <div key={review._id} className="bg-white rounded-xl shadow-md p-6 transition-all duration-200 hover:shadow-lg">
                            {editingReview?._id === review._id ? (
                                <ReviewForm
                                    providerId={providerId}
                                    existingReview={review}
                                    onFinish={handleEditFinish}
                                />
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            {review?.user?.profilePic ? (
                                                <img
                                                    src={review.user.profilePic}
                                                    alt={review.user.username}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <FaUser className="w-6 h-6 text-blue-500" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-gray-800">{review?.user?.username || 'Anonymous'}</p>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    className={`w-5 h-5 ${
                                                        index < review.rating
                                                            ? "text-yellow-400"
                                                            : "text-gray-200"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                                    {review?.user && user?._id === review.user._id && (
                                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => handleEdit(review)}
                                                className="flex items-center space-x-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <FaEdit className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <FaTrashAlt className="w-4 h-4" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default React.memo(ReviewList);
