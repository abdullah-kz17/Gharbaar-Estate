import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUpload, FaBed, FaBath, FaUtensils } from "react-icons/fa";
import Modal from "react-modal";
import { createProperty } from "../../store/thunks/PropertyThunk";

Modal.setAppElement("#root");

const PropertyForm = () => {
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        area: "",
        address: "",
        latitude: "",
        longitude: "",
        role: "user",
        beds: "",
        baths: "",
        kitchens: "",
        renovationRequired: false,
        renovationReason: "",
        phone: "",
        email: "",
        realtorId: "",
    });

    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [features, setFeatures] = useState([]);
    const [amenities, setAmenities] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [aiResults, setAiResults] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setImagePreview(urls);
    };

    useEffect(() => {
        return () => {
            imagePreview.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imagePreview]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("📤 Submitting property...");

        const requiredFields = [
            "name", "description", "price", "area", "address", "latitude", "longitude", "beds", "baths", "kitchens"
        ];
        const isIncomplete = requiredFields.some(field => !formData[field]);

        if (isIncomplete) {
            toast.error("Please fill all required fields.");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("area", formData.area);
        data.append(
            "location",
            JSON.stringify({
                address: formData.address,
                coordinates: {
                    type: "Point",
                    coordinates: [
                        parseFloat(formData.longitude),
                        parseFloat(formData.latitude),
                    ],
                },
            })
        );
        data.append("role", formData.role);
        data.append("features", JSON.stringify(features));
        data.append("amenities", JSON.stringify(amenities));
        data.append(
            "rooms",
            JSON.stringify({
                beds: parseInt(formData.beds),
                baths: parseInt(formData.baths),
                kitchens: parseInt(formData.kitchens),
            })
        );
        data.append("renovationRequired", formData.renovationRequired);
        data.append("renovationReason", formData.renovationReason);
        data.append(
            "contactInfo",
            JSON.stringify({
                phone: formData.phone,
                email: formData.email,
            })
        );
        if (formData.realtorId) data.append("realtorId", formData.realtorId);
        images.forEach((img) => data.append("images", img));

        // ✅ Debugging logs
        console.log("🧾 FormData content:");
        for (let pair of data.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        setIsSubmitting(true);
        try {
            // ✅ Submit to backend
            const res = await dispatch(createProperty({ formData: data })).unwrap();
            console.log("✅ Property created successfully!", res);
            toast.success("Property created successfully!");

            // ✅ Run AI prediction for each image
            const results = [];
            for (let image of images) {
                const aiData = new FormData();
                aiData.append("image", image);

                const aiRes = await fetch("http://localhost:8080/api/ai/analyze-image", {
                    method: "POST",
                    body: aiData,
                });

                if (!aiRes.ok) throw new Error("AI prediction failed");

                const result = await aiRes.json();
                results.push({
                    prediction: result.prediction,
                    highlightUrl: result.highlight_url, // ✅ Already contains full URL
                });
            }

            setAiResults(results);
            setModalOpen(true); // ✅ Show AI modal instantly

            // ✅ Reset form
            setFormData({
                name: "",
                description: "",
                price: "",
                area: "",
                address: "",
                latitude: "",
                longitude: "",
                role: "user",
                beds: "",
                baths: "",
                kitchens: "",
                renovationRequired: false,
                renovationReason: "",
                phone: "",
                email: "",
                realtorId: "",
            });
            setFeatures([]);
            setAmenities([]);
            setImages([]);
            setImagePreview([]);
        } catch (error) {
            console.error("❌ Submission error:", error);
            toast.error("Submission failed: " + (error?.message || "Unknown error"));
        }
        finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Create New Property</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="name" value={formData.name} onChange={handleChange} label="Property Name *" />
                    <Input name="price" value={formData.price} type="number" onChange={handleChange} label="Price (PKR) *" />
                    <Input name="area" value={formData.area} onChange={handleChange} label="Area *" />
                    <Input name="address" value={formData.address} onChange={handleChange} label="Address *" />
                    <Input name="latitude" value={formData.latitude} onChange={handleChange} label="Latitude *" />
                    <Input name="longitude" value={formData.longitude} onChange={handleChange} label="Longitude *" />
                    <Select name="role" value={formData.role} onChange={handleChange} label="Role">
                        <option value="user">User</option>
                        <option value="realtor">Realtor</option>
                    </Select>
                    <Input name="realtorId" value={formData.realtorId} onChange={handleChange} label="Realtor ID (optional)" />
                </div>

                <TextArea name="description" value={formData.description} onChange={handleChange} label="Description *" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TagInput label="Features" tags={features} setTags={setFeatures} placeholder="Press Enter to add feature (e.g., Garage, Garden, Pool)" />
                    <TagInput label="Amenities" tags={amenities} setTags={setAmenities} placeholder="Press Enter to add amenity (e.g., Gas, Water Supply, Sewerage)" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input name="beds" type="number" value={formData.beds} onChange={handleChange} label={<><FaBed className="inline" /> Beds *</>} />
                    <Input name="baths" type="number" value={formData.baths} onChange={handleChange} label={<><FaBath className="inline" /> Baths *</>} />
                    <Input name="kitchens" type="number" value={formData.kitchens} onChange={handleChange} label={<><FaUtensils className="inline" /> Kitchens *</>} />
                </div>

                <div className="flex items-center space-x-2">
                    <input type="checkbox" name="renovationRequired" checked={formData.renovationRequired} onChange={handleChange} />
                    <label>Renovation Required</label>
                </div>
                {formData.renovationRequired && (
                    <Input name="renovationReason" value={formData.renovationReason} onChange={handleChange} label="Renovation Reason" />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="phone" value={formData.phone} onChange={handleChange} label="Phone" />
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} label="Email" />
                </div>

                <div className="border-2 border-dashed p-4 text-center rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                        <FaUpload className="text-xl" />
                        <span>Click or Drag & Drop Images</span>
                    </label>
                    <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>

                <div className="flex gap-2 flex-wrap mt-2">
                    {imagePreview.map((url, idx) => (
                        <img key={idx} src={url} alt={`preview-${idx}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 text-white rounded ${isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                >
                    {isSubmitting ? "Submitting..." : "Submit Property"}
                </button>
            </form>

            {/* AI Modal */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="AI Image Analysis"
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto  mx-auto my-16 p-6 bg-white rounded-lg shadow-xl"
                overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
            >
                <h3 className="text-xl font-semibold mb-4">AI Image Analysis & Suggestions</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aiResults.map((res, idx) => (
                        <div key={idx} className="border p-4 rounded-lg shadow-sm">
                            <p className="font-medium text-gray-800">
                                Suggestion: <span className="text-indigo-600">{res.prediction}</span>
                            </p>
                            <img
                                src={res.highlightUrl}
                                alt={`AI Highlight ${idx}`}
                                className="w-full h-auto mt-2 rounded object-cover"
                            />
                        </div>
                    ))}
                </div>

                <div className="text-right mt-6">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

// Reusable Components
const Input = ({ name, label, value, onChange, type = "text" }) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        {label}
        <input
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-indigo-300"
        />
    </label>
);

const TextArea = ({ name, label, value, onChange }) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        {label}
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={4}
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-indigo-300"
        />
    </label>
);

const Select = ({ name, label, value, onChange, children }) => (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        {label}
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-indigo-300"
        >
            {children}
        </select>
    </label>
);

const TagInput = ({ label, tags, setTags, placeholder }) => {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if ((e.key === "Enter" || e.key === ",") && input.trim()) {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()]);
            }
            setInput("");
        }
    };

    const handleRemove = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            <label>{label}</label>
            <div className="flex flex-wrap gap-2 border px-3 py-2 rounded shadow-sm bg-white">
                {tags.map((tag, idx) => (
                    <span key={idx} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                        {tag}
                        <button type="button" onClick={() => handleRemove(tag)} className="text-red-500 hover:text-red-700">×</button>
                    </span>
                ))}
                <input
                    type="text"
                    className="flex-1 outline-none min-w-[100px]"
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );
};

export default PropertyForm;
