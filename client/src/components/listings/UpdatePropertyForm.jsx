import React from 'react';
import { useForm } from 'react-hook-form';
import { FiHome, FiMapPin, FiDollarSign, FiPhone, FiMail } from 'react-icons/fi';

const UpdatePropertyPage = ({ onSubmit, defaultValues }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Update Property</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white shadow p-6 rounded-md">

                {/* Name & Description */}
                <div>
                    <label className="block font-semibold mb-1">Property Name</label>
                    <input
                        {...register('name', { required: true })}
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2"
                        placeholder="Modern Apartment"
                    />
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        {...register('description', { required: true })}
                        rows={3}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Spacious 3-bed apartment with modern amenities..."
                    />
                </div>

                {/* Price & Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Price ($)</label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="150000"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Area</label>
                        <input
                            {...register('area', { required: true })}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="10 Marla"
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold mb-1 flex items-center gap-2">
                        <FiMapPin /> Address
                    </label>
                    <input
                        {...register('location.address', { required: true })}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="123 Main St, City"
                    />
                </div>

                {/* Rooms */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-semibold mb-1">Bedrooms</label>
                        <input
                            type="number"
                            {...register('rooms.beds')}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="3"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Bathrooms</label>
                        <input
                            type="number"
                            {...register('rooms.baths')}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="2"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Kitchens</label>
                        <input
                            type="number"
                            {...register('rooms.kitchens')}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="1"
                        />
                    </div>
                </div>

                {/* Features */}
                <div>
                    <label className="block font-semibold mb-1">Features (comma-separated)</label>
                    <input
                        {...register('features')}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Garage, Balcony, Garden"
                    />
                </div>

                {/* Amenities */}
                <div>
                    <label className="block font-semibold mb-1">Amenities (comma-separated)</label>
                    <input
                        {...register('amenities')}
                        className="w-full border px-3 py-2 rounded-md"
                        placeholder="Gas, Water, Electricity"
                    />
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-semibold mb-1 flex items-center gap-2"><FiPhone /> Phone</label>
                        <input
                            {...register('contactInfo.phone')}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="+1234567890"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1 flex items-center gap-2"><FiMail /> Email</label>
                        <input
                            type="email"
                            {...register('contactInfo.email')}
                            className="w-full border px-3 py-2 rounded-md"
                            placeholder="agent@example.com"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Update Property
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePropertyPage;
