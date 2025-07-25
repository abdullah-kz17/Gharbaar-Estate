import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosPublic } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(true);
    const hasVerified = useRef(false);

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token || !email) {
                toast.error('Invalid or missing verification token');
                navigate('/login');
                return;
            }

            if (hasVerified.current) return;
            hasVerified.current = true;

            try {
                const { data } = await axiosPublic.get(`/auth/verify-email?token=${token}&email=${email}`);
                if (data.success) {
                    toast.success('Email verified successfully!');
                } else {
                    toast.error(data.message || 'Email verification failed');
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Server error during verification');
            } finally {
                setVerifying(false);
                setTimeout(() => navigate('/login'), 2000);
            }
        };

        verifyEmail();

        // Cleanup function
        return () => {
            hasVerified.current = true;
        };
    }, [token, email, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
                    {verifying ? 'Verifying your email...' : 'Redirecting...'}
                </h2>
            </div>
        </div>
    );
}
