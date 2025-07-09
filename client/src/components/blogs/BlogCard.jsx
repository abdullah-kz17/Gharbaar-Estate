import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegThumbsUp, FaThumbsUp, FaComment, FaCalendarAlt, FaUser, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleLike } from "../../store/thunks/blogThunks";
import { toast } from "react-toastify";

const BlogCard = ({ blog }) => {
  const {
    _id,
    title,
    excerpt,
    featuredImage,
    createdAt,
    category,
    comments,
    likes,
    slug,
    createdBy,
    isFeatured,
  } = blog;

  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  const handleLike = async () => {
    try {
      const action = await dispatch(toggleLike(_id)).unwrap();
      setLiked(action.liked);
      setLikeCount(prev => action.liked ? prev + 1 : prev - 1);
      toast.success(action.liked ? "Liked the blog!" : "Removed like.");
    } catch {
      toast.error("Failed to toggle like.");
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Category and Featured Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="px-3 py-1 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-full">
            {category}
          </span>
          {isFeatured && (
            <span className="px-3 py-1 bg-yellow-500 dark:bg-yellow-600 text-white text-sm font-medium rounded-full flex items-center gap-1">
              <FaStar className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Author Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-3">
          {createdBy?.profilePic ? (
            <img
              src={createdBy.profilePic}
              alt={createdBy.username}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <FaUser className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          )}
          <div className="text-white">
            <p className="font-medium">{createdBy?.username || 'Anonymous'}</p>
            <p className="text-sm opacity-90 flex items-center">
              <FaCalendarAlt className="w-3 h-3 mr-1" />
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link to={`/blogs/${slug}`} className="block group">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3 line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {liked ? (
                <FaThumbsUp className="text-lg text-indigo-600 dark:text-indigo-400 animate-pulse" />
              ) : (
                <FaRegThumbsUp className="text-lg" />
              )}
              <span className="text-sm">{likeCount}</span>
            </button>

            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <FaComment className="text-lg" />
              <span className="text-sm">{comments.length}</span>
            </div>
          </div>

          <Link
            to={`/blogs/${slug}`}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(BlogCard);
