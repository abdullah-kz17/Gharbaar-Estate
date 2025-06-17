import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, deleteBlog } from "../store/thunks/blogThunks";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import BlogCard from "../components/blogs/BlogCard";

const Blogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading, error } = useSelector(state => state.blog);
  const { user } = useAuth();
  
  // Local state for filtering and searching
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    dispatch(getAllBlogs())
      .unwrap()
      .catch(err => {
        console.error("Failed to load blogs:", err);
        toast.error(`Failed to load blogs: ${err}`);
      });
  }, [dispatch]);

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

  // Filter and sort blogs
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern with Gradient Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 opacity-90"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Decorative Line */}
              <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"></div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Discover Amazing
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300 mt-2">
                  Stories & Insights
                </span>
              </h1>
              <p className="text-lg text-white/90 mb-6 max-w-xl">
                Explore our collection of insightful articles and stories about real estate and property management
              </p>

              {/* Quick Stats */}
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{blogs.length}</div>
                  <div className="text-white/80 text-sm">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{categories.length}</div>
                  <div className="text-white/80 text-sm">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {blogs.reduce((acc, blog) => acc + (blog.views || 0), 0)}
                  </div>
                  <div className="text-white/80 text-sm">Views</div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-all duration-300"
                  />
                  <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                </div>
              </div>

              {/* Admin Add Blog Button */}
              {user?.role === "admin" && (
                <Link 
                  to="/admin-dashboard/add-blog"
                  className="group relative inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create New Blog</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-gray-50 dark:text-gray-900" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              fill="currentColor"
              d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
            ></path>
          </svg>
        </div>
      </div>

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
            Showing {filteredBlogs.length} of {blogs.length} blogs
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
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredBlogs.map(blog => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;