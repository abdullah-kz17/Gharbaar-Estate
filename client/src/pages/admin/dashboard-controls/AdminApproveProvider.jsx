// src/pages/admin/AdminProviderApprovalTable.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    adminApproveProvider,
    adminDeleteProvider,
    adminGetAllProviders,
    adminToggleBanProvider,
    adminToggleFeatured,
} from "../../../store/thunks/ServiceProviderThunk.js";
import { FaBan, FaCheck, FaStar, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import PropertyTable from "../../../components/admin/PropertyTable.jsx"
import Loader from "../../../components/common/Loader.jsx";

const AdminProviderApprovalTable = () => {
    const dispatch = useDispatch();
    const { providers, loading, error, success } = useSelector((state) => state.serviceProvider);

    useEffect(() => {
        dispatch(adminGetAllProviders());
    }, [dispatch]);

    useEffect(() => {
        if (success) toast.success(success);
        if (error) toast.error(error);
    }, [success, error]);

    const handleApprove = (id) => dispatch(adminApproveProvider(id));
    const handleBanToggle = (id) => dispatch(adminToggleBanProvider(id));
    const handleFeatureToggle = (id) => dispatch(adminToggleFeatured(id));
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this provider?")) {
            dispatch(adminDeleteProvider(id));
        }
    };

    const pendingProviders = providers.filter((p) => !p.isApproved);

    const headers = ["Business Name", "User", "Email", "Status", "Actions"];

    const rows = pendingProviders.map((provider) => [
        provider.businessName,
        provider.user?.username || "Unknown",
        provider.user?.email || "N/A",
        <div className="flex gap-2 flex-wrap">
            {provider.isBanned && (
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">Banned</span>
            )}
            {provider.isFeatured && (
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">Featured</span>
            )}
        </div>,
        [
            <button
                key="approve"
                onClick={() => handleApprove(provider._id)}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
                title="Approve"
            >
                <FaCheck />
            </button>,
            <button
                key="ban"
                onClick={() => handleBanToggle(provider._id)}
                className={`p-2 rounded text-white transition ${
                    provider.isBanned ? "bg-gray-500 hover:bg-gray-600" : "bg-red-600 hover:bg-red-700"
                }`}
                title={provider.isBanned ? "Unban" : "Ban"}
            >
                <FaBan />
            </button>,
            <button
                key="feature"
                onClick={() => handleFeatureToggle(provider._id)}
                className={`p-2 rounded text-white transition ${
                    provider.isFeatured ? "bg-yellow-600 hover:bg-yellow-700" : "bg-yellow-400 hover:bg-yellow-500"
                }`}
                title={provider.isFeatured ? "Unfeature" : "Feature"}
            >
                <FaStar />
            </button>,
            <button
                key="delete"
                onClick={() => handleDelete(provider._id)}
                className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded transition"
                title="Delete"
            >
                <FaTrash />
            </button>
        ]
    ]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-indigo-800">Pending Service Providers</h2>

            {loading ? (
                <div className="text-center py-10 text-lg text-gray-600"><Loader /></div>
            ) : pendingProviders.length === 0 ? (
                <div className="text-center py-10 text-lg text-gray-600">No pending providers.</div>
            ) : (
                <PropertyTable headers={headers} rows={rows} />
            )}
        </div>
    );
};

export default AdminProviderApprovalTable;
