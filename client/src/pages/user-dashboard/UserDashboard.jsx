import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
    FaCheckCircle,
    FaHourglassHalf,
    FaHeart,
    FaStar,
} from 'react-icons/fa';

import { fetchFavoriteServices } from "../../store/thunks/FavouriteServiceThunk.js";
import { getUserFavorites } from "../../store/thunks/FavouriteThunk.js";
import { getUserProperties } from "../../store/thunks/PropertyThunk.js";

const StatCard = ({ title, value, Icon, color }) => (
    <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors duration-300">
        <div
            className={`p-4 flex items-center justify-between bg-gradient-to-r ${color} text-white`}
        >
            <div className="text-lg font-semibold truncate">{title}</div>
            <Icon className="w-8 h-8 opacity-90" aria-hidden="true" />
        </div>
        <div className="p-5 text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 transition-colors duration-300">
            {value}
        </div>
    </div>
);

const UserDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProperties());
        dispatch(getUserFavorites());
        dispatch(fetchFavoriteServices());
    }, [dispatch]);

    // Using shallowEqual for better performance to avoid unnecessary re-renders
    const { userProperties } = useSelector((state) => state.property, shallowEqual);
    const { favorites: favouriteProperties } = useSelector((state) => state.favorite, shallowEqual);
    const { favorites: favouriteServices } = useSelector((state) => state.favoriteServices, shallowEqual);

    const pending = userProperties?.filter((p) => !p.isApproved).length || 0;
    const approved = userProperties?.filter((p) => p.isApproved).length || 0;
    const favouritesCount = favouriteProperties?.length || 0;
    const favouriteServicesCount = favouriteServices?.length || 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-10 text-center sm:text-left">
                    Welcome to Your Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Pending Properties"
                        value={pending}
                        Icon={FaHourglassHalf}
                        color="from-yellow-400 to-orange-500"
                    />
                    <StatCard
                        title="Approved Properties"
                        value={approved}
                        Icon={FaCheckCircle}
                        color="from-green-500 to-emerald-600"
                    />
                    <StatCard
                        title="Favourite Properties"
                        value={favouritesCount}
                        Icon={FaHeart}
                        color="from-pink-400 to-rose-500"
                    />
                    <StatCard
                        title="Favourite Services"
                        value={favouriteServicesCount}
                        Icon={FaStar}
                        color="from-indigo-500 to-purple-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
