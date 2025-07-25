// src/pages/admin/AdminUserManagement.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllUsers,
    makeAdmin,
    removeAdmin,
    deleteUser,
} from "../../../store/thunks/UserThunk.js";
import { toast } from "react-toastify";
import { FaTrash, FaUserShield, FaUserTimes } from "react-icons/fa";
import PropertyTable from "../../../components/admin/PropertyTable.jsx";
import Loader from "../../../components/common/Loader.jsx";

const AdminUserManagement = () => {
    const dispatch = useDispatch();
    const { users, loading, error, success, total, page, totalPages } = useSelector((state) => state.adminUsers);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAllUsers({ page: currentPage, limit: 10 }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (error) toast.error(error);
        if (success) toast.success(success);
    }, [error, success]);

    const handleMakeAdmin = (id) => dispatch(makeAdmin(id));
    const handleRemoveAdmin = (id) => dispatch(removeAdmin(id));
    const handleDeleteUser = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
    };

    const headers = ["Username", "Email", "Role", "Status", "Actions"];

    const rows = users.map((user) => [
        user.username,
        user.email,
        <span
            className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                user.role === "admin"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
            }`}
        >
            {user.role}
        </span>,
        user.isDeleted ? (
            <span className="inline-block px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
                Deleted
            </span>
        ) : (
            <span className="inline-block px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                Active
            </span>
        ),
        <>
            {user.role !== "admin" ? (
                <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="text-green-600 hover:text-green-800 mx-1"
                    title="Make Admin"
                >
                    <FaUserShield size={18} />
                </button>
            ) : (
                <button
                    onClick={() => handleRemoveAdmin(user._id)}
                    className="text-yellow-500 hover:text-yellow-700 mx-1"
                    title="Remove Admin"
                >
                    <FaUserTimes size={18} />
                </button>
            )}
            <button
                onClick={() => handleDeleteUser(user._id)}
                className="text-red-600 hover:text-red-800 mx-1"
                title="Delete User"
            >
                <FaTrash size={18} />
            </button>
        </>,
    ]);

    // Pagination component
    const Pagination = ({ page, totalPages, onPageChange }) => (
        <div className="flex justify-center mt-6 gap-2">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-2 text-indigo-800">User Management</h1>
            <div className="mb-4 text-gray-600">Total Users: <span className="font-semibold">{total}</span></div>

            {loading ? (
                <div className="text-center py-10">
                    <Loader text="Loading users..." />
                </div>
            ) : (
                <>
                    <PropertyTable headers={headers} rows={rows} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
            )}
        </div>
    );
};

export default AdminUserManagement;
