import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServiceProvider } from '../../store/thunks/ServiceProviderThunk.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

const ServiceProviderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.serviceProvider);

    const [formData, setFormData] = useState({
        businessName: '',
        description: '',
        address: '',
        servicesOffered: [],
        location: '',
        image: null,
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (success) {
            toast.success(success);
            // getCurrentUserData();
            navigate('/dashboard');
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    const handleServiceToggle = (service) => {
        setFormData((prev) => {
            const alreadySelected = prev.servicesOffered.includes(service);
            return {
                ...prev,
                servicesOffered: alreadySelected
                    ? prev.servicesOffered.filter((s) => s !== service)
                    : [...prev.servicesOffered, service],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submission = new FormData();
        submission.append('businessName', formData.businessName);
        submission.append('description', formData.description);
        submission.append('address', formData.address);
        submission.append('servicesOffered', JSON.stringify(formData.servicesOffered));

        if (formData.location) {
            submission.append('location', JSON.stringify({ lat: 0, lng: 0 }));
        }

        if (formData.image) {
            submission.append('image', formData.image);
        }

        dispatch(createServiceProvider(submission));
    };

    const availableServices = [
        "Plumbing",
        "Painting",
        "Electrical",
        "Renovation",
        "Interior Design",
        "Cleaning",
        "Architecture",
        "Furniture",
        "Other",
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg space-y-6"
            encType="multipart/form-data"
        >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Become a Service Provider
            </h2>

            <div>
                <label className="block mb-2 font-medium text-gray-700">Business Name</label>
                <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium text-gray-700">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium text-gray-700">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block mb-2 font-medium text-gray-700">Services Offered</label>
                <div className="grid grid-cols-2 gap-2">
                    {availableServices.map((service) => (
                        <label key={service} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={service}
                                checked={formData.servicesOffered.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                                className="rounded border-gray-300 text-blue-600"
                            />
                            <span>{service}</span>
                        </label>
                    ))}
                </div>
                {formData.servicesOffered.length > 0 && (
                    <p className="mt-2 text-sm text-gray-500">
                        Selected: {formData.servicesOffered.join(", ")}
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-2 font-medium text-gray-700">Upload Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-4 w-48 h-32 object-cover rounded border"
                    />
                )}
            </div>

            <div>
                <label className="block mb-2 font-medium text-gray-700">Location (optional)</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="text-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
    );
};

export default ServiceProviderForm;
