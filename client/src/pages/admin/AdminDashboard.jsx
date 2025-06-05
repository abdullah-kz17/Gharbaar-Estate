import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FaBuilding,
    FaClock,
    FaStar,
    FaUserClock,
    FaUsers,
    FaUserTie,
} from 'react-icons/fa';

import { getAllProperties, getPendingProperties } from '../../store/thunks/PropertyThunk';
import { adminGetAllProviders } from '../../store/thunks/serviceProviderThunk';
import { getAllUsers } from '../../store/thunks/UserThunk.js';

// -------------------- Stat Card --------------------
const StatCard = React.memo(({ title, value, Icon, color }) => (
    <div className="rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 transition-transform transform hover:scale-[1.03] hover:shadow-2xl duration-300">
        <div
            className={`p-4 flex items-center justify-between bg-gradient-to-r ${color} text-white rounded-t-xl`}
        >
            <h3 className="text-lg font-semibold select-none">{title}</h3>
            <Icon className="w-8 h-8 opacity-90" aria-hidden="true" />
        </div>
        <div className="p-6 text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 select-text">
            {value}
        </div>
    </div>
));

// -------------------- Info Card --------------------
const InfoCard = React.memo(({ title, items, icon: Icon, type }) => (
    <div className="bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-700 rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 select-none">{title}</h3>
            {Icon && <Icon className="text-indigo-500 w-6 h-6" aria-hidden="true" />}
        </div>
        {items?.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-72 overflow-y-auto">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="py-3 flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 rounded transition-colors"
                    >
                        <div className="flex flex-col min-w-0">
                            <span className="font-medium truncate select-text">
                                {type === 'user'
                                    ? item.name || item.username
                                    : item.name || item.businessName || item.user?.username || item.user?.username}
                            </span>
                            {type === 'user' && (
                                <span className="text-gray-400 dark:text-gray-400 text-xs truncate select-text">
                                    {item.email}
                                </span>
                            )}
                        </div>

                        {type === 'provider' && (
                            <span
                                className={`text-xs font-semibold px-2 py-1 rounded-full select-none ${
                                    item.isApproved
                                        ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100'
                                }`}
                            >
                                {item.isApproved ? 'Approved' : 'Pending'}
                            </span>
                        )}

                        {type === 'property' && (
                            <span className="text-gray-400 dark:text-gray-400 text-xs select-text">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-400 dark:text-gray-500 text-sm select-none">No data available.</p>
        )}
    </div>
));

// -------------------- Admin Dashboard --------------------
const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { properties, pendingProperties } = useSelector((state) => state.property);
    const { providers } = useSelector((state) => state.serviceProvider);
    const { users } = useSelector((state) => state.adminUsers);

    useEffect(() => {
        dispatch(getAllProperties());
        dispatch(getPendingProperties());
        dispatch(adminGetAllProviders());
        dispatch(getAllUsers());
    }, [dispatch]);

    const totalProperties = properties?.length || 0;
    const pendingCount = pendingProperties?.length || 0;
    const featuredCount = properties?.filter((p) => p.isFeatured).length || 0;

    const pendingProviders = providers?.filter((p) => !p.isApproved) || [];
    const pendingProvidersCount = pendingProviders.length;
    const totalProviders = providers?.length || 0;
    const totalUsers = users?.length || 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8 transition-colors duration-500">
            <div className="max-w-7xl mx-auto space-y-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 select-none">
                    Admin Dashboard
                </h1>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    <StatCard
                        title="Total Properties"
                        value={totalProperties}
                        Icon={FaBuilding}
                        color="from-blue-600 to-indigo-700"
                    />
                    <StatCard
                        title="Pending Properties"
                        value={pendingCount}
                        Icon={FaClock}
                        color="from-yellow-400 to-orange-500"
                    />
                    <StatCard
                        title="Featured Properties"
                        value={featuredCount}
                        Icon={FaStar}
                        color="from-green-600 to-emerald-700"
                    />
                    <StatCard
                        title="Pending Providers"
                        value={pendingProvidersCount}
                        Icon={FaUserClock}
                        color="from-pink-600 to-rose-700"
                    />
                    <StatCard
                        title="Total Users"
                        value={totalUsers}
                        Icon={FaUsers}
                        color="from-indigo-600 to-purple-700"
                    />
                    <StatCard
                        title="Total Providers"
                        value={totalProviders}
                        Icon={FaUserTie}
                        color="from-teal-600 to-emerald-700"
                    />
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InfoCard
                        title="Recently Added Properties"
                        items={properties?.slice(0, 5)}
                        icon={FaBuilding}
                        type="property"
                    />
                    <InfoCard
                        title="Pending Providers"
                        items={pendingProviders?.slice(0, 5)}
                        icon={FaUserTie}
                        type="provider"
                    />
                    <InfoCard
                        title="Recent Users"
                        items={users?.slice(0, 5)}
                        icon={FaUsers}
                        type="user"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
