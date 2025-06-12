// components/ServiceProviderProfileForm.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMyServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
} from "../../store/thunks/ServiceProviderThunk.js";
import { toast } from "react-toastify";
import { MdDelete, MdUpdate } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const servicesList = [
    "Plumbing",
    "Painting",
    "Electrical",
    "Renovation",
    "Interior Design",
    "Cleaning",
    "Architecture",
    "Other",
];

const serviceOptions = servicesList.map((service) => ({
    label: service,
    value: service,
}));

const ServiceProviderProfileForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myProfile, loading, error, success } = useSelector(
        (state) => state.serviceProvider
    );

    const [formData, setFormData] = useState({
        businessName: "",
        description: "",
        address: "",
        servicesOffered: [],
        location: "",
        image: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        dispatch(getMyServiceProvider());
    }, [dispatch]);

    useEffect(() => {
        if (myProfile) {
            setFormData({
                businessName: myProfile.businessName || "",
                description: myProfile.description || "",
                address: myProfile.address || "",
                servicesOffered: myProfile.servicesOffered || [],
                location: JSON.stringify(myProfile.location || ""),
                image: null,
            });
        }
    }, [myProfile]);

    useEffect(() => {
        if (success) toast.success(success);
        if (error) toast.error(error);
    }, [success, error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleServiceSelect = (selectedOptions) => {
        setFormData((prev) => ({
            ...prev,
            servicesOffered: selectedOptions.map((option) => option.value),
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("businessName", formData.businessName);
        data.append("description", formData.description);
        data.append("address", formData.address);
        data.append(
            "servicesOffered",
            JSON.stringify(formData.servicesOffered)
        );
        data.append("location", formData.location);

        if (formData.image) data.append("image", formData.image);

        dispatch(updateServiceProvider(data)).then(() => {
            navigate("/service-provider/me");
        });
    };

    const handleDelete = () => {
        if (
            window.confirm("Are you sure you want to delete your service profile?")
        ) {
            dispatch(deleteServiceProvider());
        }
    };

    if (!myProfile)
        return <div className="text-center text-gray-500 mt-10">Loading profile...</div>;

    return (
        <form
            onSubmit={handleUpdate}
            className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg my-10 space-y-6"
            encType="multipart/form-data"
        >
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
                Manage Your Service Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Business Name</label>
                    <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. John’s Plumbing Services"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Business location"
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                    />
                </div>
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief about your services"
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg h-28"
                />
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">Services Offered</label>
                <Select
                    isMulti
                    name="servicesOffered"
                    value={formData.servicesOffered.map((service) => ({
                        label: service,
                        value: service,
                    }))}
                    onChange={handleServiceSelect}
                    options={serviceOptions}
                    placeholder="Select your services..."
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <div>
                    <label className="block font-semibold text-gray-700 mb-1">Upload New Image</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                {previewImage && (
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Preview:</p>
                        <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                )}
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">Location (JSON format)</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder='e.g. {"lat": 12.9716, "lng": 77.5946}'
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
                <button
                    type="submit"
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                >
                    <MdUpdate size={20} /> {loading ? "Updating..." : "Update Profile"}
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition"
                >
                    <MdDelete size={20} /> Delete Profile
                </button>
            </div>
        </form>
    );
};

export default ServiceProviderProfileForm;
