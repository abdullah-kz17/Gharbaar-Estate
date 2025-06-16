import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProperty } from "../../store/thunks/PropertyThunk.js";
import PropertyDetailCard from "../../components/listings/PropertyDetailCard.jsx";
import Loader from "../../components/common/Loader.jsx";

const PropertyDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { property, loading, error } = useSelector((state) => state.property);

    useEffect(() => {
        if (id) dispatch(getSingleProperty(id));
    }, [dispatch, id]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
            <div className="max-w-6xl mx-auto">
                {loading ? (
                    <p className="text-center text-indigo-600 dark:text-indigo-400 text-xl font-medium animate-pulse mt-20">
                        <Loader />
                    </p>
                ) : error ? (
                    <p className="text-center text-red-500 dark:text-red-400 text-lg mt-20">
                        {error}
                    </p>
                ) : !property ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-20">
                        No property found.
                    </p>
                ) : (
                    <PropertyDetailCard property={property} />
                )}
            </div>
        </div>
    );
};

export default PropertyDetail;
