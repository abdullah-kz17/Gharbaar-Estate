import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FaBuilding, FaClock, FaStar, FaUserClock, FaUsers, FaUserTie,
    FaChartLine, FaEye
} from 'react-icons/fa';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend, BarElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import {
    getAllProperties, getPendingProperties
} from '../../store/thunks/PropertyThunk';
import { adminGetAllProviders } from '../../store/thunks/ServiceProviderThunk.js';
import { getAllUsers } from '../../store/thunks/UserThunk.js';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

// -------------------- Stat Card --------------------
const StatCard = React.memo(({ title, value, Icon, color, subtitle, isLoading }) => (
    <div className={`bg-gradient-to-r p-6 rounded-2xl shadow-lg text-white transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20 ${
        isLoading ? 'animate-pulse' : ''
    }`}
         style={{ background: color }}
    >
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 mb-2 sm:mb-0">
                {Icon && <Icon className="w-12 h-12 max-w-full max-h-full opacity-80" style={{display:'block'}} />}
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <h3 className="text-lg font-semibold opacity-90 truncate">{title}</h3>
                <p className="text-4xl font-extrabold mt-1 truncate">{isLoading ? '...' : value}</p>
                {subtitle && <p className="text-sm opacity-80 mt-1 truncate">{subtitle}</p>}
            </div>
        </div>
    </div>
));

// -------------------- Info Card --------------------
const InfoCard = React.memo(({ title, items, icon, type, loading, emptyMessage }) => (
    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
            {icon && React.createElement(icon, { className: "text-indigo-500 w-6 h-6" })}
        </div>
        
        {loading ? (
            <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        ) : items?.length > 0 ? (
            <ul className="space-y-3 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                {items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm items-center hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-medium truncate text-gray-800 dark:text-white">
                                {type === 'user'
                                    ? item.name || item.username
                                    : item.name || item.businessName || item.user?.username}
                            </span>
                            {type === 'user' && <span className="text-gray-400 text-xs truncate">{item.email}</span>}
                            {type === 'property' && <span className="text-gray-400 text-xs truncate">{item.location?.address}</span>}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            {type === 'provider' && (
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    item.isApproved
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                }`}>
                                    {item.isApproved ? 'Approved' : 'Pending'}
                                </span>
                            )}
                            {type === 'property' && (
                                <span className="text-gray-500 text-xs">
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            )}
                            <FaEye className="text-gray-400 w-4 h-4" />
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <div className="text-center py-8">
                <div className="text-gray-400 text-4xl mb-3">📭</div>
                <p className="text-gray-400 text-sm">{emptyMessage || "No data available."}</p>
            </div>
        )}
    </div>
));

// -------------------- Admin Dashboard --------------------
const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    
    const { 
        properties, 
        total, 
        pendingTotal, 
        loading: propertyLoading 
    } = useSelector((state) => state.property);
    
    const { 
        providers, 
        pendingTotal: pendingProvidersTotal,
        loading: providerLoading 
    } = useSelector((state) => state.serviceProvider);
    
    const { 
        users, 
        loading: userLoading 
    } = useSelector((state) => state.adminUsers);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setIsLoading(true);
                await Promise.all([
                    dispatch(getAllProperties({ page: 1, limit: 1000 })).unwrap(),
                    dispatch(getPendingProperties({ page: 1, limit: 1000 })).unwrap(),
                    dispatch(adminGetAllProviders({ page: 1, limit: 1000 })).unwrap(),
                    dispatch(getAllUsers({ page: 1, limit: 1000 })).unwrap()
                ]);
            } catch (error) {
                console.error('Dashboard data fetch error:', error);
                toast.error('Failed to load dashboard data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [dispatch]);

    const totalProperties = total || 0;
    const pendingCount = pendingTotal || 0;
    const featuredCount = properties?.filter((p) => p.isFeatured).length || 0;
    const pendingProvidersCount = pendingProvidersTotal || 0;
    const totalProviders = providers?.length || 0;
    const totalUsers = users?.length || 0;

    // Chart Data
    const barData = {
        labels: ['Properties', 'Pending Props', 'Featured', 'Users', 'Providers', 'Pending Providers'],
        datasets: [{
            label: 'Dashboard Statistics',
            data: [totalProperties, pendingCount, featuredCount, totalUsers, totalProviders, pendingProvidersCount],
            backgroundColor: [
                '#4F46E5', '#F59E0B', '#10B981', '#6366F1', '#14B8A6', '#EC4899'
            ],
            borderRadius: 8,
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.2)'
        }]
    };

    const lineData = {
        labels: properties?.slice(0, 7).map(p => new Date(p.createdAt).toLocaleDateString()) || [],
        datasets: [{
            label: 'Recent Properties',
            data: properties?.slice(0, 7).map((_, i) => i + 1) || [],
            fill: true,
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderColor: '#6366F1',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: '#6366F1',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: { 
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: '#6366F1',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            },
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)'
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-10">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Monitor and manage your platform's performance
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Properties" 
                        value={totalProperties} 
                        Icon={FaBuilding} 
                        color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        subtitle="All properties"
                        isLoading={isLoading}
                    />
                    <StatCard 
                        title="Pending Properties" 
                        value={pendingCount} 
                        Icon={FaClock} 
                        color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                        subtitle="Awaiting approval"
                        isLoading={isLoading}
                    />
                    <StatCard 
                        title="Featured" 
                        value={featuredCount} 
                        Icon={FaStar} 
                        color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                        subtitle="Premium listings"
                        isLoading={isLoading}
                    />
                    <StatCard 
                        title="Pending Providers" 
                        value={pendingProvidersCount} 
                        Icon={FaUserClock} 
                        color="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                        subtitle="Service providers"
                        isLoading={isLoading}
                    />
                    <StatCard 
                        title="Total Users" 
                        value={totalUsers} 
                        Icon={FaUsers} 
                        color="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                        subtitle="Registered users"
                        isLoading={isLoading}
                    />
                    <StatCard 
                        title="Total Providers" 
                        value={totalProviders} 
                        Icon={FaUserTie} 
                        color="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
                        subtitle="Service providers"
                        isLoading={isLoading}
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                            <FaChartLine className="text-indigo-500" />
                            Overall Statistics
                        </h3>
                        <Bar data={barData} options={chartOptions} />
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                            <FaChartLine className="text-indigo-500" />
                            Recent Properties Trend
                        </h3>
                        <Line data={lineData} options={chartOptions} />
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <InfoCard
                        title="Recently Added Properties"
                        items={properties?.slice(0, 5)}
                        icon={FaBuilding}
                        type="property"
                        loading={propertyLoading}
                        emptyMessage="No properties added yet"
                    />
                    <InfoCard
                        title="Pending Providers"
                        items={providers?.filter(p => !p.isApproved).slice(0, 5)}
                        icon={FaUserTie}
                        type="provider"
                        loading={providerLoading}
                        emptyMessage="No pending providers"
                    />
                    <InfoCard
                        title="Recent Users"
                        items={users?.slice(0, 5)}
                        icon={FaUsers}
                        type="user"
                        loading={userLoading}
                        emptyMessage="No users registered yet"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
