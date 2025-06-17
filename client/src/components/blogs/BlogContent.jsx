import React from "react";
import { FaUser, FaCalendarAlt, FaEye, FaThumbsUp, FaComment } from "react-icons/fa";

const BlogContent = ({ blog }) => {
  const {
    title,
    content,
    featuredImage,
    category,
    createdBy,
    createdAt,
    likes,
    comments,
    views
  } = blog;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-4 py-1.5 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-full">
              {category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {/* Author Info */}
          <div className="flex items-center space-x-4">
            {createdBy?.profilePic ? (
              <img
                src={createdBy.profilePic}
                alt={createdBy.username}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <FaUser className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
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
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <FaEye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{views || 0} views</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <FaThumbsUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{likes.length} likes</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <FaComment className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{comments.length} comments</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-xl prose-img:shadow-lg prose-strong:text-gray-800 dark:prose-strong:text-gray-100 prose-strong:font-semibold prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-ol:text-gray-600 dark:prose-ol:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-300 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300 prose-blockquote:border-l-indigo-600 dark:prose-blockquote:border-l-indigo-400 prose-code:text-gray-800 dark:prose-code:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:text-gray-800 dark:prose-pre:text-gray-100 prose-base:text-gray-900 dark:prose-base:text-gray-100">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </article>
  );
};

export default BlogContent;
