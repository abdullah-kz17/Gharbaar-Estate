import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitReview } from "../../store/thunks/ServiceProviderThunk.js";
import { toast } from "react-toastify";

const ReviewForm = ({ providerId, existingReview = null, onFinish }) => {
    const [rating, setRating] = useState(existingReview?.rating || 0);
    const [comment, setComment] = useState(existingReview?.comment || "");

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        try {
            await dispatch(submitReview({ providerId, rating, comment })).unwrap();
            console.log("Submitting review with:", { providerId, rating, comment });
            toast.success("Review submitted");
            setRating(0);
            setComment("");
            onFinish?.(); // clear edit mode
        } catch {
            toast.error("Failed to submit review");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div>
                <label className="block font-medium">Rating</label>
                <div className="flex space-x-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                            onClick={() => setRating(star)}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            <div>
                <label className="block font-medium">Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                />
            </div>

            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                {existingReview ? "Update Review" : "Submit Review"}
            </button>
        </form>
    );
};

export default ReviewForm;
