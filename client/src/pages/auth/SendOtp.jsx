// import React, { useState } from 'react';
// import { axiosPublic } from '../../utils/axiosInstance';
// import { toast } from 'react-toastify';

// export default function SendOtp() {
//     const [phone, setPhone] = useState('');
//     const [loading, setLoading] = useState(false);

//     const handleSendOtp = async (e) => {
//         e.preventDefault();

//         // const cleanedPhone = phone.replace(/\D/g, '');
//         // if (cleanedPhone.length < 10) {
//         //     toast.error('Please enter a valid phone number');
//         //     return;
//         // }

//         setLoading(true);
//         try {
//             const res = await axiosPublic.post('/auth/send-otp', { phone });

//             if (res.data.success) {
//                 toast.success('OTP sent successfully');
//             } else {
//                 toast.error(res.data.message || 'Failed to send OTP');
//             }
//         } catch (error) {
//             console.error('Send OTP error:', error);
//             toast.error(error?.response?.data?.message || 'Server error');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
//             <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:text-gray-100">
//                 <h2 className="text-2xl font-bold text-center mb-6">Send OTP to Your Phone</h2>

//                 <form onSubmit={handleSendOtp} className="space-y-4">
//                     <div>
//                         <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
//                             Phone Number
//                         </label>
//                         <input
//                             type="tel"
//                             id="phone"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             placeholder="e.g. 1234567890"
//                             required
//                             className="mt-1 w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-400 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-600"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className={`w-full py-2 text-white rounded-md transition ${
//                             loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
//                         }`}
//                     >
//                         {loading ? 'Sending OTP...' : 'Send OTP'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
