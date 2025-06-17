import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiList, FiClock, FiUserCheck, FiLogOut } from 'react-icons/fi';
import { FaAddressBook, FaUsers } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Blogs from '../Blogs';

const navItems = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: <FiHome />, end: true },
    { to: '/admin-dashboard/properties', label: 'Property Management', icon: <FiList /> },
    { to: '/admin-dashboard/pending-approvals', label: 'Pending Approvals', icon: <FiClock /> },
    { to: '/admin-dashboard/pending-providers-approval', label: 'Pending Providers Approvals', icon: <FiUserCheck /> },
    { to: '/admin-dashboard/admin-users', label: 'Users', icon: <FaUsers /> },
    { to: '/admin-dashboard/add-blog', label: 'Create Blog', icon: <FaAddressBook /> },
];

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 transition-colors duration-500">
            {/* Mobile Sidebar Toggle Button */}
            <button
                className="md:hidden m-4 p-2 rounded-md bg-indigo-700 text-white fixed z-30 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700
          shadow-2xl p-6 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex-shrink-0
          z-20
        `}
            >
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-10 tracking-wide select-none">
                    Admin Panel
                </h2>

                {/* Nav takes all available vertical space */}
                <nav className="flex flex-col gap-3 text-gray-700 dark:text-gray-300 flex-grow overflow-y-auto">
                    {navItems.map(({ to, label, icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                 focus:outline-none focus:ring-2 focus:ring-indigo-400
                 ${
                                    isActive
                                        ? 'bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 font-semibold'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                                }`
                            }
                            onClick={() => setSidebarOpen(false)} // close sidebar on mobile nav click
                        >
                            <span className="text-xl">{icon}</span>
                            <span className="truncate">{label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Logout button with mt-auto to push to bottom */}
                <button
                    onClick={handleLogout}
                    className="mt-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90
            text-white flex items-center gap-2 px-4 py-2 rounded-md transition
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                    aria-label="Logout"
                    type="button"
                >
                    <FiLogOut className="text-xl" aria-hidden="true" />
                    Logout
                </button>
            </aside>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main content */}
            <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 md:p-8 overflow-y-auto min-h-screen transition-colors duration-500">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
