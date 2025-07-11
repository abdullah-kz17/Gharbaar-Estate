// pages/ProviderRequestsPage.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProviderRequests,
    respondToRequest,
    deleteRequest,
} from "../../store/thunks/ServiceRequestThunk.js";
import Loader from "../../components/common/Loader.jsx";
import { toast } from "react-toastify";

const ProviderRequestsPage = () => {
    const dispatch = useDispatch();
    const { providerRequests, loading, error } = useSelector(state => state.request);
    const [editResponse, setEditResponse] = useState({});

    useEffect(() => {
        dispatch(getProviderRequests());
    }, [dispatch]);

    useEffect(() => {
        if (error) toast.error(error);
    }, [error]);

    const handleRespond = (id, status) => {
        dispatch(respondToRequest({
            requestId: id,
            status,
            response: editResponse[id] || '',
        })).then(() => {
            setEditResponse(prev => ({ ...prev, [id]: '' }));
        });
    };

    const handleDelete = id => {
        if (window.confirm("Delete this request?")) {
            dispatch(deleteRequest(id));
        }
    };

    if (loading) return <Loader />;
    if (!providerRequests.length) return <p className="text-center text-gray-500 text-xl font-bold my-10">No requests found.</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Incoming Requests</h2>
            <div className="overflow-auto bg-white shadow rounded-lg">
                <table className="min-w-full table-auto">
                    <thead>
                    <tr>
                        {["User", "Message", "Submitted", "Status", "Your Response", "Actions"].map(h => (
                            <th key={h} className="px-4 py-2 border-b">{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {providerRequests.map(req => (
                        <tr key={req._id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-b">
                                <div className="flex items-center gap-2">
                                    {req.user.profilePic && (
                                        <img src={req.user.profilePic} alt={req.user.username} className="w-8 h-8 rounded-full" />
                                    )}
                                    <div>
                                        <p className="font-medium">{req.user.username}</p>
                                        <p className="text-xs text-gray-500">{req.user.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-2 border-b">{req.message}</td>
                            <td className="px-4 py-2 border-b">
                                {new Date(req.createdAt).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border-b capitalize">{req.status}</td>
                            <td className="px-4 py-2 border-b">
                                {req.status === "pending" ? (
                                    <textarea
                                        rows={2}
                                        value={editResponse[req._id] || ""}
                                        onChange={e => setEditResponse(prev => ({ ...prev, [req._id]: e.target.value }))}
                                        className="w-full border rounded px-2 py-1"
                                        placeholder="Type your response..."
                                    />
                                ) : (
                                    <p className="whitespace-pre-wrap">{req.response}</p>
                                )}
                            </td>
                            <td className="px-4 py-2 border-b flex gap-2">
                                {req.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => handleRespond(req._id, "accepted")}
                                            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleRespond(req._id, "rejected")}
                                            className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => handleDelete(req._id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProviderRequestsPage;
