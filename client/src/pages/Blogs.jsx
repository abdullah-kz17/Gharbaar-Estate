import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, deleteBlog } from "../store/thunks/blogThunks";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import BlogCard from "../components/blogs/BlogCard";
import Pagination from '../components/common/Pagination';
import PageHeader from '../components/common/PageHeader';

const Blogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, error, total, page, totalPages } = useSelector(state => state.blog);
  const { user } = useAuth();
  
  // Local state for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  useEffect(() => {
    dispatch(getAllBlogs({ page: currentPage, limit }))
      .unwrap()
      .catch(err => {
        console.error("Failed to load blogs:", err);
        toast.error(`Failed to load blogs: ${err}`);
      });
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      dispatch(deleteBlog(id))
        .unwrap()
        .then(() => {
          toast.success("Blog deleted successfully");
        })
        .catch(err => {
          console.error("Delete failed:", err);
          toast.error(`Delete failed: ${err}`);
        });
    }
  };

  // Get unique categories from blogs
  const categories = [...new Set(blogs.map(blog => blog.category))];

  // Filter and sort blogs (now only filter/sort current page)
  const filteredBlogs = blogs
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || blog.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "likes":
          return (b.likes?.length || 0) - (a.likes?.length || 0);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Discover Amazing Stories & Insights"
        subtitle="Explore our collection of insightful articles and stories about real estate and property management."
        backgroundImage="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1500&q=80"
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Rest of the content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="views">Most Viewed</option>
                <option value="likes">Most Liked</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredBlogs.length} of {total} blogs
              {searchTerm && ` for "${searchTerm}"`}
              {filterCategory !== "all" && ` in ${filterCategory}`}
            </div>
          </div>

          {/* Admin View - Enhanced Table */}
          {user?.role === "admin" ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white p-6">
                <h2 className="text-2xl font-bold">Blog Management</h2>
                <p className="opacity-90">Manage all blog posts from this dashboard</p>
              </div>
              
              {filteredBlogs.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-gray-400 dark:text-gray-500 text-5xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No blogs found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {searchTerm || filterCategory !== "all" 
                      ? "Try adjusting your search or filter criteria" 
                      : "Create your first blog post to get started"}
                  </p>
                  <Link 
                    to="/admin-dashboard/add-blog"
                    className="inline-flex items-center bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                  >
                    <FaPlus className="mr-2" />
                    Create First Blog
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-6">Title</th>
                        <th className="py-3 px-6">Category</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Views</th>
                        <th className="py-3 px-6">Likes</th>
                        <th className="py-3 px-6">Created</th>
                        <th className="py-3 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredBlogs.map(blog => (
                        <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              {blog.featuredImage && (
                                <img 
                                  src={blog.featuredImage} 
                                  alt={blog.title}
                                  className="w-12 h-12 rounded-lg object-cover mr-3"
                                />
                              )}
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                                  {blog.title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                  {blog.content?.substring(0, 60)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                              {blog.category}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              blog.status === 'published' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            }`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
                            {blog.views || 0}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
                            {blog.likes?.length || 0}
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Link 
                                to={`/blogs/${blog.slug}`} 
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition"
                                title="View Blog"
                              >
                                <FaEye />
                              </Link>
                              <button
                                onClick={() => navigate(`/edit-blog/${blog._id}`)}
                                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 p-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/50 transition"
                                title="Edit Blog"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(blog._id)}
                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/50 transition"
                                title="Delete Blog"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <Pagination
                currentPage={page}
                totalPages={totalPages || 1}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : (
            // User View - Enhanced Card Grid
            <div>
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-gray-400 dark:text-gray-500 text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No blogs found</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto">
                    {searchTerm || filterCategory !== "all" 
                      ? "Try adjusting your search criteria or browse all categories" 
                      : "Check back later for new content"}
                  </p>
                  {(searchTerm || filterCategory !== "all") && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setFilterCategory("all");
                      }}
                      className="mt-6 bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredBlogs.map(blog => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages || 1}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;