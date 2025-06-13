import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRequests, deleteRequest } from "../../../store/thunks/ServiceRequestThunk.js";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const MyRequests = () => {
    const dispatch = useDispatch();
    const { myRequests, loading, error } = useSelector((state) => state.request);

    useEffect(() => {
        dispatch(getMyRequests());
    }, [dispatch]);

    const handleDelete = async (requestId) => {
        if (!window.confirm("Are you sure you want to delete this request?")) return;
        try {
            await dispatch(deleteRequest(requestId)).unwrap();
            toast.success("Request deleted");
        } catch (err) {
            toast.error(err);
        }
    };

    const renderStatusBadge = (status) => {
        const base =
            "px-3 py-1 text-xs font-semibold rounded-full inline-block text-white";
        switch (status) {
            case "accepted":
                return <span className={`${base} bg-green-500`}>Accepted</span>;
            case "rejected":
                return <span className={`${base} bg-red-500`}>Rejected</span>;
            default:
                return <span className={`${base} bg-yellow-500`}>Pending</span>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                📨 My Service Requests
            </h2>

            {loading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && myRequests?.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">You have not made any requests yet.</p>
            )}

            <div className="grid gap-4">
                {myRequests.map((req) => (
                    <div
                        key={req._id}
                        className="bg-white dark:bg-gray-900 rounded-lg shadow p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300">
                                {req.provider?.businessName || "Unknown Provider"}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-line">
                                {req.message}
                            </p>
                            {req.response && (
                                <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-300 italic">
                                    Response: {req.response}
                                </p>
                            )}
                            <div className="mt-2">{renderStatusBadge(req.status)}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Sent: {new Date(req.createdAt).toLocaleString()}
                            </p>
                        </div>

                        <button
                            onClick={() => handleDelete(req._id)}
                            className="text-red-500 hover:text-red-700 transition"
                            title="Delete request"
                        >
                            <FaTrashAlt className="text-lg" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRequests;
