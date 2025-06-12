import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FaBuilding, FaClock, FaStar, FaUserClock, FaUsers, FaUserTie,
} from 'react-icons/fa';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend, BarElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import {
    getAllProperties, getPendingProperties
} from '../../store/thunks/PropertyThunk';
import { adminGetAllProviders } from '../../store/thunks/serviceProviderThunk';
import { getAllUsers } from '../../store/thunks/UserThunk';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

// -------------------- Stat Card --------------------
const StatCard = React.memo(({ title, value, Icon, color }) => (
    <div className="bg-gradient-to-r p-5 rounded-2xl shadow-lg text-white transition hover:scale-105 duration-300 cursor-pointer"
         style={{ background: color }}
    >
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-3xl font-extrabold">{value}</p>
            </div>
            <Icon className="w-10 h-10 opacity-80" />
        </div>
    </div>
));

// -------------------- Info Card --------------------
const InfoCard = React.memo(({ title, items, icon: Icon, type }) => (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
            {Icon && <Icon className="text-indigo-500 w-6 h-6" />}
        </div>
        {items?.length > 0 ? (
            <ul className="space-y-3 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                {items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm items-center hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 rounded transition">
                        <div className="flex flex-col">
                            <span className="font-medium truncate text-gray-800 dark:text-white">
                                {type === 'user'
                                    ? item.name || item.username
                                    : item.name || item.businessName || item.user?.username}
                            </span>
                            {type === 'user' && <span className="text-gray-400 text-xs truncate">{item.email}</span>}
                        </div>
                        {type === 'provider' && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                item.isApproved
                                    ? 'bg-green-200 text-green-800'
                                    : 'bg-yellow-200 text-yellow-800'
                            }`}>
                                {item.isApproved ? 'Approved' : 'Pending'}
                            </span>
                        )}
                        {type === 'property' && (
                            <span className="text-gray-500 text-xs">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-gray-400 text-sm">No data available.</p>
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

    // Chart Data
    const barData = {
        labels: ['Properties', 'Pending Props', 'Featured', 'Users', 'Providers'],
        datasets: [{
            label: 'Dashboard Stats',
            data: [totalProperties, pendingCount, featuredCount, totalUsers, totalProviders],
            backgroundColor: [
                '#4F46E5', '#F59E0B', '#10B981', '#6366F1', '#14B8A6'
            ],
            borderRadius: 8
        }]
    };

    const lineData = {
        labels: properties?.slice(0, 7).map(p => new Date(p.createdAt).toLocaleDateString()),
        datasets: [{
            label: 'Recent Properties',
            data: properties?.slice(0, 7).map((_, i) => i + 1),
            fill: true,
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: '#6366F1',
            tension: 0.4
        }]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-10 rounded-lg shadow-lg overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12 ">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    <StatCard title="Total Properties" value={totalProperties} Icon={FaBuilding} color="linear-gradient(to right, #4f46e5, #6366f1)" />
                    <StatCard title="Pending Properties" value={pendingCount} Icon={FaClock} color="linear-gradient(to right, #fbbf24, #f59e0b)" />
                    <StatCard title="Featured" value={featuredCount} Icon={FaStar} color="linear-gradient(to right, #10b981, #34d399)" />
                    <StatCard title="Pending Providers" value={pendingProvidersCount} Icon={FaUserClock} color="linear-gradient(to right, #ec4899, #f43f5e)" />
                    <StatCard title="Users" value={totalUsers} Icon={FaUsers} color="linear-gradient(to right, #6366f1, #8b5cf6)" />
                    <StatCard title="Providers" value={totalProviders} Icon={FaUserTie} color="linear-gradient(to right, #14b8a6, #06b6d4)" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Overall Statistics</h3>
                        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Recent Properties Trend</h3>
                        <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                    </div>
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
