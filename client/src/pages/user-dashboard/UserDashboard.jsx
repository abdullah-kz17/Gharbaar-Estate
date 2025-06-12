import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FaCheckCircle,
    FaHourglassHalf,
    FaHeart,
    FaStar,
} from 'react-icons/fa';

import { fetchFavoriteServices } from "../../store/thunks/FavouriteServiceThunk";
import { getUserFavorites } from "../../store/thunks/FavouriteThunk";
import { getUserProperties } from "../../store/thunks/PropertyThunk";

const StatCard = ({ title, value, Icon, color }) => (
    <div className="rounded-xl shadow-md border bg-white dark:bg-gray-900 dark:border-gray-700 transition">
        <div className={`p-4 flex justify-between items-center text-white bg-gradient-to-r ${color}`}>
            <h3 className="text-lg font-semibold truncate">{title}</h3>
            <Icon className="w-8 h-8 opacity-90" />
        </div>
        <div className="p-5 text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100">
            {value}
        </div>
    </div>
);

const UserDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserFavorites());
        dispatch(getUserProperties());
        dispatch(fetchFavoriteServices());
    }, [dispatch]);


    const { userProperties } = useSelector((state) => state.property);
    const { favorites: favoritePropertiesRaw } = useSelector((state) => state.favorite);
    const { favorites: favoriteServicesRaw } = useSelector((state) => state.favoriteServices);

    // Deduplicated + valid favorites
    const favoriteProperties = Array.isArray(favoritePropertiesRaw)
        ? favoritePropertiesRaw.filter((fav, index, self) => {
            const id = fav?.propertyId?._id;
            return id && self.findIndex(f => f?.propertyId?._id === id) === index;
        })
        : [];

    // Clean + count favorite services
    const favoriteServices = Array.isArray(favoriteServicesRaw)
        ? favoriteServicesRaw.filter((fav, index, self) => {
            const id = fav?.serviceProviderId?._id || fav?.serviceProviderId || fav?._id;
            return id && self.findIndex(f =>
                (f?.serviceProviderId?._id || f?.serviceProviderId || f?._id) === id
            ) === index;
        })
        : [];

    const pending = userProperties?.filter(p => !p.isApproved).length || 0;
    const approved = userProperties?.filter(p => p.isApproved).length || 0;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">
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
                        value={favoriteProperties.length}
                        Icon={FaHeart}
                        color="from-pink-500 to-rose-500"
                    />
                    <StatCard
                        title="Favourite Services"
                        value={favoriteServices.length}
                        Icon={FaStar}
                        color="from-indigo-500 to-purple-600"
                    />
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
