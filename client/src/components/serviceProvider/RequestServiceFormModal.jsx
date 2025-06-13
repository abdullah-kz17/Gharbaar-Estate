import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequest } from "../../store/thunks/ServiceRequestThunk.js";
import { toast } from "react-toastify";

const RequestFormModal = ({ providerId, onClose }) => {
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) {
            toast.error("Please enter a message");
            return;
        }
        setSubmitting(true);
        try {
            await dispatch(sendRequest({ providerId, message })).unwrap();
            toast.success("Request sent!");
            onClose();
        } catch (err) {
            toast.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 max-w-md w-full rounded-2xl p-6 shadow-lg"
            >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    Request Service from Provider
                </h2>
                <textarea
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell us what you need..."
                />
                <div className="mt-4 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="px-4 py-2 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow hover:scale-105 transition"
                    >
                        {submitting ? "Sending..." : "Send Request"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RequestFormModal;
