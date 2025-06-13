// components/RequestBell.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProviderRequests } from '../../store/thunks/ServiceRequestThunk.js';
import { selectPendingRequestsCount } from '../../store/slices/ServiceRequestSlice.js';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RequestBell = () => {
    const dispatch = useDispatch();
    const count = useSelector(selectPendingRequestsCount);

    useEffect(() => {
        dispatch(getProviderRequests());
    }, [dispatch]);

    return (
        <Link to="/provider/requests" className="relative text-xl">
            <FaBell />
            {count > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {count}
        </span>
            )}
        </Link>
    );
};

export default RequestBell;
