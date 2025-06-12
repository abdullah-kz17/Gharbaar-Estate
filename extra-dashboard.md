import React, { useEffect, useState } from 'react';
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
BarElement,
ArcElement,
RadialLinearScale,
Filler
} from 'chart.js';
import { Bar, Line, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import {
Building,
Clock,
Star,
Users,
Clock7Icon,
UserCheck,
TrendingUp,
Activity,
BarChart3,
PieChart,
Calendar,
Shield
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend,
BarElement,
ArcElement,
RadialLinearScale,
Filler
);

// Mock data for demonstration
const mockData = {
properties: Array.from({ length: 50 }, (_, i) => ({
id: i + 1,
name: `Property ${i + 1}`,
createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
isFeatured: Math.random() > 0.7,
status: Math.random() > 0.8 ? 'pending' : 'approved'
})),
users: Array.from({ length: 150 }, (_, i) => ({
id: i + 1,
name: `User ${i + 1}`,
email: `user${i + 1}@example.com`,
createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
})),
providers: Array.from({ length: 30 }, (_, i) => ({
id: i + 1,
businessName: `Provider ${i + 1}`,
isApproved: Math.random() > 0.3,
createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28))
}))
};

// Enhanced Stat Card Component
const StatCard = ({ title, value, Icon, gradient, change, changeType }) => (
<div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
style={{ background: gradient }}>
<div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white opacity-10 transform translate-x-6 -translate-y-6"></div>
<div className="relative z-10">
<div className="flex justify-between items-start mb-4">
<div className="flex-1">
<p className="text-sm font-medium opacity-90 mb-1">{title}</p>
<p className="text-3xl font-bold mb-2">{value}</p>
{change && (
<div className={`flex items-center text-sm ${changeType === 'positive' ? 'text-green-200' : 'text-red-200'}`}>
<TrendingUp className="w-4 h-4 mr-1" />
<span>{change}% vs last month</span>
</div>
)}
</div>
<div className="bg-white bg-opacity-20 rounded-xl p-3">
<Icon className="w-8 h-8" />
</div>
</div>
</div>
</div>
);

// Enhanced Info Card Component
const InfoCard = ({ title, items, icon: Icon, type, gradient }) => (
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
<div className={`p-6 text-white`} style={{ background: gradient }}>
<div className="flex items-center justify-between">
<h3 className="text-lg font-bold">{title}</h3>
{Icon && <Icon className="w-6 h-6 opacity-80" />}
</div>
</div>

        <div className="p-6">
            {items?.length > 0 ? (
                <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="flex flex-col flex-1">
                                <span className="font-medium text-gray-800 dark:text-white truncate">
                                    {type === 'user' ? item.name : item.name || item.businessName}
                                </span>
                                {type === 'user' && (
                                    <span className="text-gray-500 text-sm truncate">{item.email}</span>
                                )}
                                {type === 'property' && (
                                    <span className="text-gray-500 text-sm">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            {type === 'provider' && (
                                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    item.isApproved
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                }`}>
                                    {item.isApproved ? 'Approved' : 'Pending'}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center py-8">No data available</p>
            )}
        </div>
    </div>
);

// Chart Card Component
const ChartCard = ({ title, children, icon: Icon, gradient }) => (
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
<div className={`p-6 text-white`} style={{ background: gradient }}>
<div className="flex items-center justify-between">
<h3 className="text-lg font-bold">{title}</h3>
{Icon && <Icon className="w-6 h-6 opacity-80" />}
</div>
</div>
<div className="p-6">
{children}
</div>
</div>
);

const AdminDashboard = () => {
const [data, setData] = useState(mockData);
const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Calculate statistics
    const totalProperties = data.properties.length;
    const pendingProperties = data.properties.filter(p => p.status === 'pending').length;
    const featuredProperties = data.properties.filter(p => p.isFeatured).length;
    const totalUsers = data.users.length;
    const totalProviders = data.providers.length;
    const pendingProviders = data.providers.filter(p => !p.isApproved).length;

    // Chart configurations with beautiful gradients
    const barChartData = {
        labels: ['Properties', 'Users', 'Providers', 'Featured', 'Pending'],
        datasets: [{
            label: 'Dashboard Overview',
            data: [totalProperties, totalUsers, totalProviders, featuredProperties, pendingProperties],
            backgroundColor: [
                'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
                'linear-gradient(45deg, #fa709a 0%, #fee140 100%)'
            ],
            borderRadius: 12,
            borderSkipped: false,
        }]
    };

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Properties Added',
                data: [12, 19, 15, 25, 22, 30],
                fill: true,
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            },
            {
                label: 'Users Registered',
                data: [8, 15, 12, 20, 18, 25],
                fill: true,
                backgroundColor: 'rgba(245, 87, 108, 0.1)',
                borderColor: 'rgba(245, 87, 108, 1)',
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: 'rgba(245, 87, 108, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
            }
        ]
    };

    const doughnutData = {
        labels: ['Approved Properties', 'Pending Properties', 'Featured Properties'],
        datasets: [{
            data: [totalProperties - pendingProperties, pendingProperties, featuredProperties],
            backgroundColor: [
                'rgba(67, 233, 123, 0.8)',
                'rgba(250, 112, 154, 0.8)',
                'rgba(79, 172, 254, 0.8)'
            ],
            borderColor: [
                'rgba(67, 233, 123, 1)',
                'rgba(250, 112, 154, 1)',
                'rgba(79, 172, 254, 1)'
            ],
            borderWidth: 2,
            hoverOffset: 15
        }]
    };

    const radarData = {
        labels: ['Properties', 'Users', 'Providers', 'Activity', 'Growth', 'Engagement'],
        datasets: [{
            label: 'Platform Metrics',
            data: [85, 92, 78, 88, 95, 82],
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(102, 126, 234, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
        }]
    };

    const polarAreaData = {
        labels: ['New Users', 'Returning Users', 'Active Properties', 'Inactive Properties', 'Revenue'],
        datasets: [{
            data: [45, 35, 25, 15, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 2
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
                cornerRadius: 10,
                displayColors: false
            },
            legend: {
                display: false
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:to-gray-800">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Welcome back! Here's what's happening with your platform.
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg">
                                <Calendar className="w-5 h-5 inline mr-2" />
                                {new Date().toDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    <StatCard
                        title="Total Properties"
                        value={totalProperties}
                        Icon={Building}
                        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                        change="+12"
                        changeType="positive"
                    />
                    <StatCard
                        title="Pending Properties"
                        value={pendingProperties}
                        Icon={Clock}
                        gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                        change="-5"
                        changeType="negative"
                    />
                    <StatCard
                        title="Featured Properties"
                        value={featuredProperties}
                        Icon={Star}
                        gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                        change="+8"
                        changeType="positive"
                    />
                    <StatCard
                        title="Pending Providers"
                        value={pendingProviders}
                        Icon={Clock7Icon}
                        gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                        change="+3"
                        changeType="positive"
                    />
                    <StatCard
                        title="Total Users"
                        value={totalUsers}
                        Icon={Users}
                        gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                        change="+25"
                        changeType="positive"
                    />
                    <StatCard
                        title="Total Providers"
                        value={totalProviders}
                        Icon={UserCheck}
                        gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                        change="+7"
                        changeType="positive"
                    />
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <ChartCard
                        title="Platform Overview"
                        icon={BarChart3}
                        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    >
                        <div className="h-80">
                            <Bar data={barChartData} options={chartOptions} />
                        </div>
                    </ChartCard>

                    <ChartCard
                        title="Growth Trends"
                        icon={TrendingUp}
                        gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                    >
                        <div className="h-80">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </ChartCard>
                </div>

                {/* Additional Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <ChartCard
                        title="Property Distribution"
                        icon={PieChart}
                        gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    >
                        <div className="h-64">
                            <Doughnut data={doughnutData} options={chartOptions} />
                        </div>
                    </ChartCard>

                    <ChartCard
                        title="Performance Metrics"
                        icon={Activity}
                        gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
                    >
                        <div className="h-64">
                            <Radar data={radarData} options={chartOptions} />
                        </div>
                    </ChartCard>

                    <ChartCard
                        title="User Analytics"
                        icon={Shield}
                        gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
                    >
                        <div className="h-64">
                            <PolarArea data={polarAreaData} options={chartOptions} />
                        </div>
                    </ChartCard>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <InfoCard
                        title="Recent Properties"
                        items={data.properties.slice(0, 5)}
                        icon={Building}
                        type="property"
                        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    />
                    <InfoCard
                        title="Pending Providers"
                        items={data.providers.filter(p => !p.isApproved).slice(0, 5)}
                        icon={Clock7Icon}
                        type="provider"
                        gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                    />
                    <InfoCard
                        title="Recent Users"
                        items={data.users.slice(0, 5)}
                        icon={Users}
                        type="user"
                        gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                    />
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #a8a8a8;
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;