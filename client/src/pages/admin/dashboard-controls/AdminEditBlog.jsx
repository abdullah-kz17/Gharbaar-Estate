import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../../../store/thunks/blogThunks";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BlogAdminForm from "../../../components/blogs/BlogAdminForm";

const AdminEditBlog = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleBlog: blog, loading, error } = useSelector(state => state.blog);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      
      try {
        setIsInitialLoad(true);
        await dispatch(getBlogById(id)).unwrap();
      } catch (err) {
        console.error("Failed to load blog:", err);
        toast.error(`Failed to load blog: ${err}`);
        navigate("/admin-dashboard");
      } finally {
        setIsInitialLoad(false);
      }
    };

    fetchBlog();
  }, [dispatch, id, navigate]);

  const handleSubmit = async (formData) => {
    if (isSubmitting || !blog?._id) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(updateBlog({ id: blog._id, formData })).unwrap();
      toast.success("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(`Update failed: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state during initial load
  if (isInitialLoad || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Show error state if there's an error or no blog data
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Blog Not Found</h2>
          <p className="text-red-600 dark:text-red-400 mb-6">{error || "The requested blog could not be found."}</p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate("/blogs")}
              className="w-full bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
            >
              Go to Blogs
            </button>
            <button 
              onClick={() => navigate("/admin-dashboard")}
              className="w-full bg-gray-500 dark:bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Edit Blog Post
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Modify your blog post details and content
              </p>
            </div>
            <button
              onClick={() => navigate("/blogs")}
              className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Blog Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Current Blog Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-300">Title:</span>
              <p className="text-gray-800 dark:text-gray-100">{blog.title}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-300">Category:</span>
              <p className="text-gray-800 dark:text-gray-100">{blog.category}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-300">Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                blog.status === 'published' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                  : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
              }`}>
                {blog.status}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-300">Last Updated:</span>
              <p className="text-gray-800 dark:text-gray-100">{new Date(blog.updatedAt || blog.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <BlogAdminForm 
            initialData={blog} 
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminEditBlog;