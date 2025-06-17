import React, { useState } from "react";

const categories = [
  "Property Buying", "Property Selling", "AI Tools", "Renovation Tips",
  "Interior Design", "Neighborhood Guides", "Market Predictions", "Maintenance Advice", "Other"
];

const BlogAdminForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    excerpt: initialData.excerpt || "",
    content: initialData.content || "",
    tags: initialData.tags.join(", ") || "",
    category: initialData.category || "Other",
    status: initialData.status || "draft",
    isFeatured: initialData.isFeatured || false,
    featuredImage: null
  });

  const handleChange = e => {
    const { name, type, value, checked, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "tags") payload.append("tags", val.split(",").map(t => t.trim()));
      else if (val !== null) payload.append(key, val);
    });
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      {["title", "excerpt"].map(field => (
        <div key={field}>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          />
        </div>
      ))}

      <div>
        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Content</label>
        <textarea
          name="content"
          rows="6"
          value={form.content}
          onChange={handleChange}
          className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Category</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          >
            {categories.map(cat => <option key={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Status</label>
          <select 
            name="status" 
            value={form.status} 
            onChange={handleChange} 
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
          >
            {["draft","published","archived"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <label className="mr-2 text-gray-700 dark:text-gray-300">Featured</label>
        <input 
          type="checkbox" 
          name="isFeatured" 
          checked={form.isFeatured} 
          onChange={handleChange} 
          className="accent-indigo-600 dark:accent-indigo-400" 
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Tags (comma)</label>
        <input 
          type="text" 
          name="tags" 
          value={form.tags} 
          onChange={handleChange} 
          className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent" 
        />
      </div>

      <div>
        <label className="block font-medium mb-1 text-gray-700 dark:text-gray-300">Featured Image</label>
        <input 
          type="file" 
          accept="image/*" 
          name="featuredImage" 
          onChange={handleChange} 
          className="w-full text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/50 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900" 
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white py-3 rounded font-semibold transition-colors"
      >
        Update Blog
      </button>
    </form>
  );
};

export default BlogAdminForm;
