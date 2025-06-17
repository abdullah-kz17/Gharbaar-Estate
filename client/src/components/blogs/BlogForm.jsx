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
            className="max-w-3xl mx-auto p-6 bg-gradient-to-tr from-indigo-600 to-purple-700 rounded-xl shadow-2xl text-white space-y-6"
        >
            <h2 className="text-3xl font-semibold text-center">Create a New Blog</h2>

            {error && <div className="bg-red-500 text-white px-4 py-2 rounded">{error}</div>}

            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                    name="title"
                    type="text"
                    maxLength="150"
                    required
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Excerpt (Optional)</label>
                <textarea
                    name="excerpt"
                    maxLength="300"
                    rows={2}
                    value={form.excerpt}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea
                    name="content"
                    required
                    rows={6}
                    value={form.content}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none"
                >
                    {[
                        "Property Buying",
                        "Property Selling",
                        "AI Tools",
                        "Renovation Tips",
                        "Interior Design",
                        "Neighborhood Guides",
                        "Market Predictions",
                        "Maintenance Advice",
                        "Other",
                    ].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
                <input
                    name="tags"
                    type="text"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="e.g. real estate, renovation"
                    className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-purple-600"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-3 rounded shadow-lg max-h-52 object-cover"
                    />
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-purple-800 hover:bg-indigo-700 py-3 rounded text-lg font-semibold transition"
            >
                Submit Blog
            </button>
        </form>
    );
};

export default BlogForm;
