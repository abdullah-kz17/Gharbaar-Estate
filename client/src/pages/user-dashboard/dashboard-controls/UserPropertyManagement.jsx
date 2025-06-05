import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProperties, deleteProperty } from "../../../store/thunks/PropertyThunk.js";
import { toast } from "react-toastify";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/common/Loader.jsx";
import PropertyTable from "../../../components/admin/PropertyTable.jsx"

const UserPropertyManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userProperties, loading } = useSelector((state) => state.property);

    useEffect(() => {
        dispatch(getUserProperties());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            dispatch(deleteProperty(id))
                .unwrap()
                .then(() => {
                    dispatch(getUserProperties());
                    toast.success("Property deleted successfully");
                })
                .catch(() => {
                    toast.error("Failed to delete property");
                });
        }
    };

    const headers = ["Name", "Status", "Price", "Actions"];

    const rows = userProperties.map((prop) => [
        prop.name,
        <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                prop.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}
        >
      {prop.isApproved ? "Approved" : "Pending"}
    </span>,
        `Rs. ${prop.price.toLocaleString()}`,
        <div className="flex gap-4">
            <button
                onClick={() => navigate(`/property/${prop._id}`)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition"
                title="View"
            >
                <FiEye size={18} />
            </button>
            <button
                onClick={() => navigate(`/property/edit/${prop._id}`)}
                className="text-yellow-600 hover:text-yellow-800 flex items-center gap-1 transition"
                title="Edit"
            >
                <FiEdit2 size={18} />
            </button>
            <button
                onClick={() => handleDelete(prop._id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1 transition"
                title="Delete"
            >
                <FiTrash2 size={18} />
            </button>
        </div>,
    ]);

    return (
        <div className="px-4 md:px-10 py-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-600">
                Your Listed Properties
            </h1>

            {loading ? (
                <p className="text-center text-purple-600 font-semibold text-lg"><Loader /></p>
            ) : userProperties.length === 0 ? (
                <div className="text-center text-purple-400 py-20">
                    <img
                        src="https://www.svgrepo.com/show/77954/empty-box.svg"
                        alt="No properties"
                        className="w-32 h-32 mx-auto mb-6 opacity-60"
                    />
                    <p className="text-xl font-medium">You haven’t added any properties yet.</p>
                </div>
            ) : (
                <PropertyTable headers={headers} rows={rows} />
            )}
        </div>
    );
};

export default UserPropertyManagement;
