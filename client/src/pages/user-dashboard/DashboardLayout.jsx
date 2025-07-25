import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiList, FiLogOut, FiHeart } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const navItems = [
    { to: '/user-dashboard', label: 'Dashboard', icon: <FiHome />, end: true },
    { to: '/user-dashboard/dashboard-properties', label: 'My Properties', icon: <FiList /> },
    { to: '/user-dashboard/my/requests', label: 'My Requested Services', icon: <FiList /> },
    { to: '/user-dashboard/dashboard-favourites', label: 'Favourites Properties', icon: <FiHeart /> },
    { to: '/user-dashboard/dashboard-favourite-services', label: 'Favourite Services', icon: <FiHeart /> },
];

const DashboardLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 transition-colors duration-500 relative">
            {/* Mobile: Sidebar toggle button */}
            <button
                className="md:hidden m-4 p-2 rounded-md bg-indigo-700 text-white fixed z-30 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                type="button"
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700
                    shadow-2xl p-6 flex flex-col transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:static md:flex-shrink-0
                    z-20
                `}
                style={
                  window.innerWidth < 768
                    ? { visibility: sidebarOpen ? 'visible' : 'hidden', pointerEvents: sidebarOpen ? 'auto' : 'none' }
                    : {}
                }
            >
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-10 tracking-wide select-none">
                    My Dashboard
                </h2>
                <nav className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 flex-grow overflow-y-auto">
                    {navItems.map(({ to, label, icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                                 ${
                                    isActive
                                        ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                                }`
                            }
                            onClick={() => setSidebarOpen(false)}
                            tabIndex={0}
                            style={{ outline: 'none', boxShadow: 'none' }}
                        >
                            <span className="text-xl">{icon}</span>
                            <span className="truncate">{label}</span>
                        </NavLink>
                    ))}
                </nav>
                <button
                    onClick={handleLogout}
                    className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90
                        text-white flex items-center justify-center gap-2 px-4 py-2 rounded-md transition
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    aria-label="Logout"
                    type="button"
                >
                    <FiLogOut className="text-xl" aria-hidden="true" />
                    Logout
                </button>
            </aside>

            {/* Overlay for mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main content area */}
            <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 overflow-y-auto min-h-screen transition-colors duration-500">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
