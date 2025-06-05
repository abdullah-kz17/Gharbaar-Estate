import React, { useState } from 'react';
import { axiosPublic } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function VerifyOTP() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!phone || !otp) {
            toast.error('Both phone and OTP are required');
            return;
        }

        setLoading(true);
        try {
            const res = await axiosPublic.post('/auth/verify-otp', { phone, otp });

            if (res.data.success) {
                toast.success('Phone number verified successfully!');
                setPhone('');
                setOtp('');
            } else {
                toast.error(res.data.message || 'Verification failed');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.error(error?.response?.data?.message || 'Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Verify Your Phone</h2>

                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="e.g. 1234567890"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            required
                            className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 text-white rounded-md transition ${
                            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
}
