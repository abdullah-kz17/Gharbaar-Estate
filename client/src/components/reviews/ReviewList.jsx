import React from "react";
import { FaStar, FaTrashAlt, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteReview } from "../../store/thunks/ServiceProviderThunk.js";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext.jsx";

const ReviewList = ({ onEdit,providerId  }) => {
    const { reviews } = useSelector(state => state.serviceProvider);
    const { user } = useAuth();
    const dispatch = useDispatch();

    const handleDelete = () => {
        if (window.confirm("Delete this review?")) {
            dispatch(deleteReview(providerId))
                .unwrap()
                .then(() => toast.success("Review deleted"))
                .catch(() => toast.error("Failed to delete review"));
        }
    };


    return (
        <div className="space-y-4">
            {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

            {reviews.map((review) => {
                // Guard against incomplete review objects
                if (!review || typeof review.rating !== "number") return null;

                return (
                    <div key={review._id} className="bg-gray-50 p-4 rounded-md shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={review?.user?.profilePic || "/default-user.png"}
                                    alt={review?.user?.username}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{review?.user?.username}</p>
                                    <p className="text-sm text-gray-500">{review?.user?.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center text-yellow-500">
                                {[...Array(review.rating || 0)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>

                        <p className="mt-2 text-gray-700">{review.comment}</p>

                        {review?.user && user?._id === review.user._id && (
                            <div className="flex space-x-2 mt-2">
                                <button onClick={() => onEdit(review)} className="text-blue-500">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDelete(review._id)} className="text-red-500">
                                    <FaTrashAlt />
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ReviewList;
