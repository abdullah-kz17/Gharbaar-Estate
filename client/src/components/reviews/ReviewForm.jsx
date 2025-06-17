import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitReview } from "../../store/thunks/ServiceProviderThunk.js";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ providerId, existingReview = null, onFinish }) => {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [comment, setComment] = useState(existingReview?.comment || "");
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const dispatch = useDispatch();

    const resetForm = () => {
        setRating(0);
        setComment("");
        setHoveredRating(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            await dispatch(submitReview({ 
                providerId, 
                rating, 
                comment,
                reviewId: existingReview?._id
            })).unwrap();
            
            toast.success(existingReview ? "Review updated successfully!" : "Review submitted successfully!");
            resetForm();
            onFinish?.();
        } catch {
            toast.error(existingReview ? "Failed to update review" : "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700">
                    {existingReview ? "Update Your Review" : "Write a Review"}
                </label>
                <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transform transition-transform hover:scale-110"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <FaStar
                                className={`w-8 h-8 ${
                                    star <= (hoveredRating || rating)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }`}
                            />
                        </button>
                    ))}
                    <span className="ml-2 text-gray-600">
                        {rating ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
                    </span>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-lg font-semibold text-gray-700">
                    Your Comment
                </label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                    required
                />
            </div>

            <div className="flex justify-end space-x-4">
                {existingReview && (
                    <button
                        type="button"
                        onClick={() => {
                            resetForm();
                            onFinish?.();
                        }}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 ${
                        isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                    }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {existingReview ? "Updating..." : "Submitting..."}
                        </span>
                    ) : (
                        existingReview ? "Update Review" : "Submit Review"
                    )}
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
