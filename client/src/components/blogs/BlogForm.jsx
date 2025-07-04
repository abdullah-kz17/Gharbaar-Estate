import React, { useState } from "react";

const BlogForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "Other",
        tags: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleReset = () => {
        setForm({
            title: "",
            content: "",
            excerpt: "",
            tags: "",
            category: "",
            featuredImage: null,
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.title || !form.content) {
            setError("Title and Content are required.");
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, val]) => {
            if (key === "tags") {
                formData.append("tags", val.split(",").map(tag => tag.trim()));
            } else {
                formData.append(key, val);
            }
        });
        if (image) formData.append("featuredImage", image);

        setError("");
        onSubmit(formData, handleReset);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-100 dark:border-gray-800 mt-10"
        >
            <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-200 mb-2 tracking-tight">Create a New Blog</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Share your insights, stories, and expertise with the world!</p>

            {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center font-medium">{error}</div>}

            {/* Title */}
            <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Title <span className="text-red-500">*</span></label>
                <input
                    name="title"
                    type="text"
                    maxLength="150"
                    required
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 focus:border-indigo-400 dark:focus:border-indigo-600 transition"
                    placeholder="Enter a catchy blog title"
                />
            </div>

            {/* Excerpt */}
            <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Excerpt</label>
                <textarea
                    name="excerpt"
                    maxLength="300"
                    rows={2}
                    value={form.excerpt}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 focus:border-indigo-400 dark:focus:border-indigo-600 transition"
                    placeholder="A short summary or teaser for your blog (optional)"
                />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Content <span className="text-red-500">*</span></label>
                <textarea
                    name="content"
                    required
                    rows={8}
                    value={form.content}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 focus:border-indigo-400 dark:focus:border-indigo-600 transition min-h-[180px]"
                    placeholder="Write your blog content here..."
                />
            </div>

            {/* Category & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 focus:border-indigo-400 dark:focus:border-indigo-600 transition"
                    >
                        {["Property Buying","Property Selling","AI Tools","Renovation Tips","Interior Design","Neighborhood Guides","Market Predictions","Maintenance Advice","Other"].map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Tags <span className="text-xs text-gray-400">(comma-separated)</span></label>
                    <input
                        name="tags"
                        type="text"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="e.g. real estate, renovation"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 focus:border-indigo-400 dark:focus:border-indigo-600 transition"
                    />
                </div>
            </div>

            {/* Image Upload & Preview */}
            <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Featured Image</label>
                <div className="flex items-center gap-6">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-28 h-20 object-cover rounded-lg border border-gray-200 shadow-md"
                        />
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 mt-4"
            >
                Submit Blog
            </button>
        </form>
    );
};

export default BlogForm;
