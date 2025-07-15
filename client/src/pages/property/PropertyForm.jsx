import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaUpload, FaBed, FaBath, FaUtensils, FaMapMarkerAlt, FaRulerCombined, FaDollarSign, FaPhone, FaEnvelope, FaPlus, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { createProperty } from "../../store/thunks/PropertyThunk";
import { DEFECT_TYPES, QUALITY_TIERS, estimateRenovationCost } from "../../utils/renovationEstimator";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const PropertyForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const [renovationInputs, setRenovationInputs] = useState([]);
    const [showRenovationFlow, setShowRenovationFlow] = useState(false);
    const [currentRenovationIdx, setCurrentRenovationIdx] = useState(0);
    const [costResult, setCostResult] = useState(null);

    // Helper: Validation
    const validateForm = () => {
        const errors = {};
        const requiredFields = [
            "name", "description", "price", "area", "address", "latitude", "longitude", "beds", "baths", "kitchens"
        ];
        requiredFields.forEach(field => {
            if (!formData[field] || (typeof formData[field] === 'string' && !formData[field].trim())) {
                errors[field] = "Required";
            }
        });
        if (formData.price && isNaN(Number(formData.price))) errors.price = "Must be a number";
        if (formData.latitude && isNaN(Number(formData.latitude))) errors.latitude = "Must be a number";
        if (formData.longitude && isNaN(Number(formData.longitude))) errors.longitude = "Must be a number";
        if (formData.beds && isNaN(Number(formData.beds))) errors.beds = "Must be a number";
        if (formData.baths && isNaN(Number(formData.baths))) errors.baths = "Must be a number";
        if (formData.kitchens && isNaN(Number(formData.kitchens))) errors.kitchens = "Must be a number";
        if (formData.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) errors.email = "Invalid email";
        if (images.length === 0) errors.images = "At least one image required";
        return errors;
    };
    const [formErrors, setFormErrors] = useState({});

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
        // Validate
        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, msg]) => {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${msg}`);
            });
            return;
        }
        console.log("📤 Submitting property...");

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
            if (results.some(r => r.prediction === "Needs Renovation")) {
                setShowRenovationFlow(true);
                setCurrentRenovationIdx(0);
                setRenovationInputs([]);
            }

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
        <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-950 shadow-2xl rounded-2xl border border-indigo-100 dark:border-gray-800 mt-8 mb-12 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-800 dark:text-indigo-200 tracking-tight">Create New Property</h2>
            <form onSubmit={handleSubmit} className="space-y-10">
                {/* Basic Info */}
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input name="name" value={formData.name} onChange={handleChange} label={<><FaRulerCombined className="inline mr-2 text-indigo-400" />Property Name *</>} error={formErrors.name} />
                        <Input name="price" value={formData.price} type="number" onChange={handleChange} label={<><FaDollarSign className="inline mr-2 text-green-400" />Price (PKR) *</>} error={formErrors.price} />
                        <Input name="area" value={formData.area} onChange={handleChange} label={<><FaRulerCombined className="inline mr-2 text-blue-400" />Area *</>} error={formErrors.area} />
                        <Input name="address" value={formData.address} onChange={handleChange} label={<><FaMapMarkerAlt className="inline mr-2 text-red-400" />Address *</>} error={formErrors.address} />
                        <Input name="latitude" value={formData.latitude} onChange={handleChange} label="Latitude *" error={formErrors.latitude} />
                        <Input name="longitude" value={formData.longitude} onChange={handleChange} label="Longitude *" error={formErrors.longitude} />
                        <Select name="role" value={formData.role} onChange={handleChange} label="Role">
                            <option value="user">User</option>
                            <option value="realtor">Realtor</option>
                        </Select>
                        <Input name="realtorId" value={formData.realtorId} onChange={handleChange} label="Realtor ID (optional)" />
                    </div>
                </section>
                {/* Description */}
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Description</h3>
                    <TextArea name="description" value={formData.description} onChange={handleChange} label="Description *" error={formErrors.description} />
                </section>
                {/* Features & Amenities */}
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Features & Amenities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TagInput label="Features" tags={features} setTags={setFeatures} placeholder="Press Enter to add feature (e.g., Garage, Garden, Pool)" />
                        <TagInput label="Amenities" tags={amenities} setTags={setAmenities} placeholder="Press Enter to add amenity (e.g., Gas, Water Supply, Sewerage)" />
                    </div>
                </section>
                {/* Rooms */}
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Rooms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input name="beds" type="number" value={formData.beds} onChange={handleChange} label={<><FaBed className="inline mr-2 text-purple-400" />Beds *</>} error={formErrors.beds} />
                        <Input name="baths" type="number" value={formData.baths} onChange={handleChange} label={<><FaBath className="inline mr-2 text-pink-400" />Baths *</>} error={formErrors.baths} />
                        <Input name="kitchens" type="number" value={formData.kitchens} onChange={handleChange} label={<><FaUtensils className="inline mr-2 text-yellow-400" />Kitchens *</>} error={formErrors.kitchens} />
                    </div>
                </section>
                {/* Renovation */}
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Renovation</h3>
                    <div className="flex items-center space-x-2 mb-2">
                        <input type="checkbox" name="renovationRequired" checked={formData.renovationRequired} onChange={handleChange} />
                        <label>Renovation Required</label>
                    </div>
                    {formData.renovationRequired && (
                        <Input name="renovationReason" value={formData.renovationReason} onChange={handleChange} label="Renovation Reason" />
                    )}
                </section>
                {/* Contact Info */}
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input name="phone" value={formData.phone} onChange={handleChange} label={<><FaPhone className="inline mr-2 text-green-400" />Phone</>} />
                        <Input name="email" type="email" value={formData.email} onChange={handleChange} label={<><FaEnvelope className="inline mr-2 text-blue-400" />Email</>} error={formErrors.email} />
                    </div>
                </section>
                {/* Image Upload */}
                <section className="bg-white dark:bg-gray-900 rounded-xl p-6 mb-4 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">Images</h3>
                    <div className={`border-2 border-dashed p-6 text-center rounded-md cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition relative ${formErrors.images ? 'border-red-400 dark:border-red-400' : 'border-indigo-200 dark:border-gray-700'}`}
                        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('ring-2', 'ring-indigo-400'); }}
                        onDragLeave={e => { e.preventDefault(); e.currentTarget.classList.remove('ring-2', 'ring-indigo-400'); }}
                        onDrop={e => {
                            e.preventDefault();
                            e.currentTarget.classList.remove('ring-2', 'ring-indigo-400');
                            const files = Array.from(e.dataTransfer.files);
                            setImages(files);
                            setImagePreview(files.map(file => URL.createObjectURL(file)));
                        }}
                    >
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <FaUpload className="text-2xl text-indigo-400" />
                            <span className="font-medium">Click or Drag & Drop Images</span>
                        </label>
                        <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                        {formErrors.images && <div className="text-red-600 mt-2 text-sm font-medium">{formErrors.images}</div>}
                    </div>
                    <div className="flex gap-3 flex-wrap mt-4">
                        {imagePreview.map((url, idx) => (
                            <div key={idx} className="relative group">
                                <img src={url} alt={`preview-${idx}`} className="w-24 h-24 object-cover rounded-lg border-2 border-indigo-200 dark:border-gray-700 shadow" />
                                <button type="button" onClick={() => {
                                    const newImgs = [...images];
                                    newImgs.splice(idx, 1);
                                    setImages(newImgs);
                                    const newPreviews = [...imagePreview];
                                    newPreviews.splice(idx, 1);
                                    setImagePreview(newPreviews);
                                }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-700 transition opacity-80 group-hover:opacity-100"
                                >
                                    <FaTimes size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
                {/* Submit Button */}
                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-6 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-200 ${isSubmitting ? 'bg-gray-400 dark:bg-gray-700' : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800'}`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Property"}
                    </button>
                </div>
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

                {/* Renovation Cost Estimation Flow */}
                {showRenovationFlow && (
                    <RenovationStepper
                        aiResults={aiResults}
                        currentIdx={currentRenovationIdx}
                        setCurrentIdx={setCurrentRenovationIdx}
                        renovationInputs={renovationInputs}
                        setRenovationInputs={setRenovationInputs}
                        setShowRenovationFlow={setShowRenovationFlow}
                        setCostResult={setCostResult}
                    />
                )}

                {/* Cost Result & Booking Option */}
                {costResult && (
                    <div className="mt-8">
                        <h4 className="text-lg font-bold mb-2">Estimated Renovation Cost</h4>
                        <CostBreakdown result={costResult} />
                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                            <button
                                className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-green-700 transition"
                                onClick={() => {
                                    toast.success("Redirecting to verified professionals...");
                                    setTimeout(() => navigate("/services"), 800);
                                }}
                            >
                                Book Verified Professional
                            </button>
                            <button
                                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg text-lg font-semibold shadow hover:bg-gray-400 transition"
                                onClick={() => setModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

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

// Enhanced Input with floating label, error, and icon support
const Input = ({ name, label, value, onChange, type = "text", error }) => (
    <label className="relative flex flex-col gap-1 text-base font-medium text-gray-700 dark:text-gray-200">
        <span className="mb-1">{label}</span>
        <input
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            className={`border-2 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-400 dark:bg-gray-900 dark:border-gray-700 dark:focus:border-indigo-500 ${error ? 'border-red-400 dark:border-red-400' : 'border-indigo-200 dark:border-gray-700'}`}
        />
        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </label>
);

const TextArea = ({ name, label, value, onChange, error }) => (
    <label className="relative flex flex-col gap-1 text-base font-medium text-gray-700 dark:text-gray-200">
        <span className="mb-1">{label}</span>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={4}
            className={`border-2 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-400 dark:bg-gray-900 dark:border-gray-700 dark:focus:border-indigo-500 ${error ? 'border-red-400 dark:border-red-400' : 'border-indigo-200 dark:border-gray-700'}`}
        />
        {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </label>
);

const Select = ({ name, label, value, onChange, children }) => (
    <label className="relative flex flex-col gap-1 text-base font-medium text-gray-700 dark:text-gray-200">
        <span className="mb-1">{label}</span>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="border-2 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-indigo-400 border-indigo-200 dark:bg-gray-900 dark:border-gray-700 dark:focus:border-indigo-500"
        >
            {children}
        </select>
    </label>
);

// Animated TagInput for features/amenities
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
        <div className="flex flex-col gap-1 text-base font-medium text-gray-700 dark:text-gray-200">
            <span className="mb-1">{label}</span>
            <div className="flex flex-wrap gap-2 border-2 border-indigo-200 dark:border-gray-700 px-4 py-2 rounded-lg bg-white dark:bg-gray-900">
                {tags.map((tag, idx) => (
                    <span key={idx} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full flex items-center gap-1 text-xs animate-fade-in">
                        {tag}
                        <button type="button" onClick={() => handleRemove(tag)} className="text-red-500 hover:text-red-700 ml-1"><FaTimes size={12} /></button>
                    </span>
                ))}
                <input
                    type="text"
                    className="flex-1 outline-none min-w-[100px] bg-transparent dark:text-gray-100"
                    placeholder={placeholder}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button type="button" onClick={() => {
                    if (input.trim() && !tags.includes(input.trim())) {
                        setTags([...tags, input.trim()]);
                        setInput("");
                    }
                }} className="text-indigo-500 hover:text-indigo-700 ml-1"><FaPlus size={14} /></button>
            </div>
        </div>
    );
};

// Renovation Stepper Component
function RenovationStepper({ aiResults, currentIdx, setCurrentIdx, renovationInputs, setRenovationInputs, setShowRenovationFlow, setCostResult }) {
    const [form, setForm] = useState({ area: '', types: [], tiers: {}, notes: '' });
    const [step, setStep] = useState(0);
    const [error, setError] = useState('');
    const totalSteps = 4;
    const needsRenovationImages = aiResults.filter(r => r.prediction === "Needs Renovation");
    const currentImageIdx = needsRenovationImages.findIndex(r => aiResults.indexOf(r) === currentIdx);
    const currentImage = aiResults.find((r, idx) => idx === currentIdx && r.prediction === "Needs Renovation");

    useEffect(() => {
        if (!currentImage) {
            if (currentIdx < aiResults.length - 1) setCurrentIdx(currentIdx + 1);
            else finish();
        }
        // eslint-disable-next-line
    }, [currentImage]);

    function handleNext() {
        if (step === 0 && (!form.area || isNaN(form.area) || form.area <= 0)) {
            setError('Please enter a valid area.');
            return;
        }
        if (step === 1 && form.types.length === 0) {
            setError('Please select at least one defect type.');
            return;
        }
        if (step === 2 && form.types.some(type => !form.tiers[type])) {
            setError('Please select quality for all defect types.');
            return;
        }
        setError('');
        setStep(step + 1);
    }
    function handlePrev() {
        setStep(step - 1);
    }
    function handleSkip() {
        // Skip this image, go to next
        if (currentIdx < aiResults.length - 1) setCurrentIdx(currentIdx + 1);
        else {
            setShowRenovationFlow(false);
            setCostResult(null);
        }
    }
    function finish() {
        setRenovationInputs([...renovationInputs, {
            area: Number(form.area),
            types: form.types,
            tiers: form.tiers,
            notes: form.notes,
            imageIdx: currentIdx,
        }]);
        if (currentIdx < aiResults.length - 1) setCurrentIdx(currentIdx + 1);
        else {
            setShowRenovationFlow(false);
            const allDefects = [...renovationInputs, {
                area: Number(form.area),
                types: form.types,
                tiers: form.tiers,
                notes: form.notes,
                imageIdx: currentIdx,
            }].flatMap(input => input.types.map(type => ({
                area: input.area,
                type,
                tier: input.tiers[type],
                notes: input.notes,
            })));
            setCostResult(estimateRenovationCost(allDefects, { includeServiceFee: true, includeTax: true }));
        }
    }
    if (!currentImage) return null;
    return (
        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-xl transition-all duration-300">
            {/* Stepper Progress Bar */}
            <div className="flex items-center mb-6">
                {[...Array(totalSteps)].map((_, idx) => (
                    <div key={idx} className={`flex-1 h-2 mx-1 rounded-full ${idx <= step ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                ))}
            </div>
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600 font-medium">Image {currentImageIdx + 1} of {needsRenovationImages.length}</span>
                <span className="text-sm text-gray-600 font-medium">Step {step + 1} of {totalSteps}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <img src={currentImage.highlightUrl} alt="Defect Highlight" className="w-56 h-40 object-cover rounded-lg border-2 border-indigo-200 shadow" />
                <div className="flex-1">
                    {step === 0 && (
                        <div className="mb-4 animate-fade-in">
                            <label className="block font-semibold mb-2 text-indigo-700 flex items-center gap-2">
                                Estimated Area of Defect (sqft)
                                <span className="text-xs text-gray-400" title="Approximate area affected by the defect">ⓘ</span>
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={form.area}
                                onChange={e => setForm({ ...form, area: e.target.value })}
                                className="border-2 border-indigo-300 px-4 py-2 rounded-lg w-40 text-lg focus:ring-2 focus:ring-indigo-400"
                                placeholder="e.g. 50"
                            />
                        </div>
                    )}
                    {step === 1 && (
                        <div className="mb-4 animate-fade-in">
                            <label className="block font-semibold mb-2 text-indigo-700">Defect Types <span className="text-xs text-gray-400">(select all that apply)</span></label>
                            <div className="flex flex-wrap gap-3">
                                {DEFECT_TYPES.map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`px-4 py-2 rounded-lg border-2 font-medium shadow-sm transition-all duration-200 flex items-center gap-2 ${form.types.includes(type) ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-indigo-50'}`}
                                        onClick={() => {
                                            if (form.types.includes(type)) setForm({ ...form, types: form.types.filter(t => t !== type) });
                                            else setForm({ ...form, types: [...form.types, type] });
                                        }}
                                    >
                                        <span className="capitalize">{type}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="mb-4 animate-fade-in">
                            <label className="block font-semibold mb-2 text-indigo-700">Select Quality for Each Type</label>
                            <div className="space-y-3">
                                {form.types.map(type => (
                                    <div key={type} className="flex items-center gap-3">
                                        <span className="w-28 font-semibold capitalize text-gray-700">{type}</span>
                                        <select
                                            value={form.tiers[type] || ''}
                                            onChange={e => setForm({ ...form, tiers: { ...form.tiers, [type]: e.target.value } })}
                                            className="border-2 border-indigo-300 px-3 py-2 rounded-lg text-base focus:ring-2 focus:ring-indigo-400"
                                        >
                                            <option value="">Select Quality</option>
                                            {QUALITY_TIERS.map(q => (
                                                <option key={q.value} value={q.value}>{q.label}</option>
                                            ))}
                                        </select>
                                        <span className="text-xs text-gray-400" title="Higher tier means better quality and higher cost">ⓘ</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="mb-4 animate-fade-in">
                            <label className="block font-semibold mb-2 text-indigo-700">Additional Notes <span className="text-xs text-gray-400">(optional)</span></label>
                            <textarea
                                value={form.notes}
                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                className="border-2 border-indigo-300 px-4 py-2 rounded-lg w-full text-base focus:ring-2 focus:ring-indigo-400"
                                rows={2}
                                placeholder="Describe the defect, urgency, or any special requirements..."
                            />
                        </div>
                    )}
                    {error && <div className="text-red-600 mt-2 font-medium animate-shake">{error}</div>}
                    <div className="mt-6 flex flex-wrap gap-3">
                        {step > 0 && <button className="px-5 py-2 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition" onClick={handlePrev}>Back</button>}
                        <button className="px-5 py-2 bg-gray-200 rounded-lg font-semibold text-gray-700 hover:bg-gray-300 transition" onClick={handleSkip}>Skip</button>
                        {step < totalSteps - 1 && <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition" onClick={handleNext}>Next</button>}
                        {step === totalSteps - 1 && <button className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition" onClick={finish}>Finish</button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Cost Breakdown Component
function CostBreakdown({ result }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <h5 className="font-semibold mb-2">Breakdown</h5>
            <ul className="mb-2">
                {result.breakdown.map((item, idx) => (
                    <li key={idx} className="mb-1">
                        <span className="font-medium">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span> ({item.area} sqft, {item.tier}):
                        Material: Rs {item.materialCost.toLocaleString()} + Labor: Rs. {item.laborCost.toLocaleString()} = <span className="font-bold">Rs. {(item.materialCost + item.laborCost).toLocaleString()}</span>
                    </li>
                      
                ))}
            </ul>
            <div className="text-sm text-gray-700">Material Total: Rs. {result.totalMaterial.toLocaleString()}</div>
            <div className="text-sm text-gray-700">Labor Total: Rs. {result.totalLabor.toLocaleString()}</div>
            <div className="text-sm text-gray-700">Petrol/Transport: Rs. {result.petrolCost.toLocaleString()}</div>
            {result.serviceFee > 0 && <div className="text-sm text-gray-700">Service Fee: Rs. {result.serviceFee.toLocaleString()}</div>}
            {result.tax > 0 && <div className="text-sm text-gray-700">Tax (5%): Rs. {result.tax.toLocaleString()}</div>}
            <div className="font-bold mt-2 text-lg">Total: Rs. {result.total.toLocaleString()}</div>
        </div>
    );
}

export default PropertyForm;
