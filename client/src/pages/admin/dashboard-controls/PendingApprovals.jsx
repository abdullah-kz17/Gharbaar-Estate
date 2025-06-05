import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPendingProperties,
    approveProperty,
    banProperty,
    featureProperty,
} from "../../../store/thunks/PropertyThunk";
import { toast } from "react-toastify";
import { FaCheckCircle, FaBan, FaStar } from "react-icons/fa";
import { removePropertyFromPending } from "../../../store/slices/PropertySlice.js";
import PropertyTable from "../../../components/admin/PropertyTable.jsx";
import Loader from "../../../components/common/Loader.jsx"; // Adjust path as needed

const PendingApprovals = () => {
    const dispatch = useDispatch();
    const { pendingProperties, loading, error } = useSelector(
        (state) => state.property
    );

    useEffect(() => {
        dispatch(getPendingProperties());
    }, [dispatch]);

    const handleApprove = async (id) => {
        try {
            await dispatch(approveProperty(id)).unwrap();
            dispatch(removePropertyFromPending(id));
            toast.success("Property approved successfully");
        } catch (err) {
            toast.error(err.message || "Failed to approve property");
        }
    };

    const handleBan = async (id) => {
        try {
            await dispatch(banProperty(id)).unwrap();
            dispatch(removePropertyFromPending(id));
            toast.success("Property banned successfully");
        } catch (err) {
            toast.error(err.message || "Failed to ban property");
        }
    };

    const handleFeature = async (id) => {
        try {
            await dispatch(featureProperty(id)).unwrap();
            dispatch(removePropertyFromPending(id));
            toast.success("Property featured successfully");
        } catch (err) {
            toast.error(err.message || "Failed to feature property");
        }
    };

    if (loading)
        return <div className="text-center py-10"><Loader /></div>;
    if (error)
        return (
            <div className="text-center py-10 text-red-500">{error}</div>
        );

    const headers = ["Title", "Owner", "Location", "Actions"];

    const rows = (pendingProperties || []).map((property) => [
        property.name,
        property?.createdBy?.username || "N/A",
        <div>
            <div>{property.location?.address || "N/A"}</div>
            {property.location?.coordinates && (
                <div className="text-xs text-gray-500">
                    {Array.isArray(property.location.coordinates)
                        ? property.location.coordinates.join(", ")
                        : `${property.location.coordinates.lat || ""}, ${
                            property.location.coordinates.lng || ""
                        }`}
                </div>
            )}
        </div>,
        <>
            <button
                onClick={() => handleApprove(property._id)}
                className="text-green-600 hover:text-green-800"
                title="Approve"
            >
                <FaCheckCircle size={18} />
            </button>
            <button
                onClick={() => handleBan(property._id)}
                className="text-red-600 hover:text-red-800"
                title="Ban"
            >
                <FaBan size={18} />
            </button>
            <button
                onClick={() => handleFeature(property._id)}
                className="text-yellow-500 hover:text-yellow-700"
                title="Feature"
            >
                <FaStar size={18} />
            </button>
        </>,
    ]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-indigo-800">
                Pending Property Approvals
            </h2>

            <PropertyTable headers={headers} rows={rows} />
        </div>
    );
};

export default PendingApprovals;
