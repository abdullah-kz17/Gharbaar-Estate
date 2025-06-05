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
import {useNavigate} from "react-router-dom";

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

    const handleMultiSelect = (e) => {
        const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
        setFormData((prev) => ({ ...prev, servicesOffered: selected }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0],
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("businessName", formData.businessName);
        data.append("description", formData.description);
        data.append("address", formData.address);
        data.append("servicesOffered", JSON.stringify(formData.servicesOffered));
        data.append("location", formData.location);

        if (formData.image) data.append("image", formData.image);

        dispatch(updateServiceProvider(data));
        if(success){
            navigate('/service-provider/me')
        }
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete your service profile?")) {
            dispatch(deleteServiceProvider());
        }
    };

    if (!myProfile) return <div className="text-center mt-10">Loading profile...</div>;

    return (
        <form
            onSubmit={handleUpdate}
            className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6"
            encType="multipart/form-data"
        >
            <h2 className="text-2xl font-semibold mb-6 text-center">My Service Profile</h2>

            <div className="mb-4">
                <label className="block font-semibold">Business Name</label>
                <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Services Offered</label>
                <select
                    multiple
                    name="servicesOffered"
                    value={formData.servicesOffered}
                    onChange={handleMultiSelect}
                    className="w-full border px-3 py-2 rounded"
                >
                    {["Plumbing", "Painting", "Electrical", "Renovation", "Interior Design", "Cleaning", "Architecture", "Other"].map(
                        (service) => (
                            <option key={service} value={service}>
                                {service}
                            </option>
                        )
                    )}
                </select>
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Upload New Image</label>
                <input type="file" name="image" onChange={handleFileChange} />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Location (optional JSON)</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>

            <div className="flex items-center justify-between mt-6">
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                    disabled={loading}
                >
                    <MdUpdate /> {loading ? "Updating..." : "Update Profile"}
                </button>
                <button
                    type="button"
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                >
                    <MdDelete /> Delete Profile
                </button>
            </div>
        </form>
    );
};

export default ServiceProviderProfileForm;
