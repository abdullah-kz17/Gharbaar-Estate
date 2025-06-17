import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogBySlug, addComment, updateComment, deleteComment } from "../store/thunks/blogThunks";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BlogContent from "../components/blogs/BlogContent";
import BlogComments from "../components/blogs/BlogComments";
import { useAuth } from "../context/AuthContext";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { singleBlog: blog, loading, error } = useSelector((state) => state.blog);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (slug) {
      dispatch(getBlogBySlug(slug))
        .unwrap()
        .catch(err => toast.error(`Blog not found: ${err}`));
    }
  }, [slug, dispatch]);

  const handleSubmit = (content) => {
    dispatch(addComment({ id: blog._id, content }))
      .unwrap()
      .then(() => toast.success("Comment added"))
      .catch(err => toast.error(`Add failed: ${err}`));
  };

  const handleUpdate = (commentId, content) => {
    dispatch(updateComment({ id: blog._id, commentId, content }))
      .unwrap()
      .then(() => toast.success("Comment updated"))
      .catch(err => toast.error(`Update failed: ${err}`));
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment({ id: blog._id, commentId }))
      .unwrap()
      .then(() => toast.success("Comment deleted"))
      .catch(err => toast.error(`Delete failed: ${err}`));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Blog Not Found</h2>
          <p className="text-red-600 dark:text-red-400 mb-6">{error || "The requested blog could not be found."}</p>
          <button 
            onClick={() => window.location.href = "/blogs"}
            className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
      <BlogContent blog={blog} />
      <BlogComments
        comments={blog.comments || []}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        currentUser={currentUser}
      />
    </div>
  );
};

export default BlogDetails;
