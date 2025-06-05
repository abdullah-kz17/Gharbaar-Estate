import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProperties, adminDeleteProperty } from '../../../store/thunks/PropertyThunk';
import moment from 'moment';
import PropertyTable from "../../../components/admin/PropertyTable.jsx";
import Loader from "../../../components/common/Loader.jsx";
import { toast } from "react-toastify";
import {FaTrash} from "react-icons/fa";

const AdminPropertyManagement = () => {
    const dispatch = useDispatch();
    const { properties, loading, error } = useSelector((state) => state.property);

    useEffect(() => {
        dispatch(getAllProperties());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            await dispatch(adminDeleteProperty(id)).unwrap();
            toast.success("Property deleted successfully");
            dispatch(getAllProperties());
        } catch (error) {
            toast.error(error || "Failed to delete property");
        }
    };

    const headers = ["Name", "Owner", "Location", "Created At", "Status"];

    const rows = (properties || []).map((property) => [
        property.name || "N/A",
        property?.createdBy?.username || "Unknown",

        // Location
        <div className="flex flex-col">
            <span>{property.location?.address || "N/A"}</span>
            {property.location?.coordinates && Array.isArray(property.location.coordinates) && (
                <span className="text-xs text-gray-500">
                    {property.location.coordinates.join(", ")}
                </span>
            )}
        </div>,

        // Created At
        moment(property.createdAt).format("MMM DD, YYYY • hh:mm A"),

        // Status + Delete Button
        <div className="flex gap-2 items-center">
            <span
                className={`px-2 py-1 rounded text-xs font-medium text-white ${
                    property.status === 'approved'
                        ? 'bg-green-500'
                        : property.status === 'pending'
                            ? 'bg-yellow-500'
                            : 'bg-orange-500'
                }`}
            >
                {property.status}
            </span>
            <button
                onClick={() => handleDelete(property._id)}
                className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                <FaTrash />
            </button>
        </div>
    ]);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-indigo-800">Property Management</h1>

            {loading ? (
                <div className="text-center text-indigo-500 py-10"><Loader /></div>
            ) : error ? (
                <div className="text-red-500 text-center py-10">{error}</div>
            ) : (
                <PropertyTable headers={headers} rows={rows} />
            )}
        </div>
    );
};

export default AdminPropertyManagement;
