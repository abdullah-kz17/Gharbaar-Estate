// BlogComments.jsx
import React, { useState } from 'react';
import { MessageSquare, Edit2, Trash2, Send, X, Check } from 'lucide-react';

const BlogComments = ({ comments = [], onSubmit, onUpdate, onDelete, currentUser }) => {
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onSubmit(newComment.trim());
    setNewComment('');
  };

  const handleEdit = (comment) => {
    if (!comment?._id) return;
    setEditingId(comment._id);
    setEditContent(comment.content);
  };

  const handleUpdate = (commentId) => {
    if (!commentId || !editContent.trim()) return;
    onUpdate(commentId, editContent.trim());
    setEditingId(null);
    setEditContent('');
  };

  const handleDelete = (commentId) => {
    if (!commentId) return;
    if (window.confirm('Are you sure you want to delete this comment?')) {
      onDelete(commentId);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  // Filter out any comments without an _id
  const validComments = comments.filter(comment => comment?._id);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen rounded-lg">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 rounded-xl">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Comments ({validComments.length})
          </h2>
        </div>

        {/* Add Comment Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-4 border-2 border-purple-200 dark:border-gray-600 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-200 resize-none bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              rows="4"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                disabled={!newComment.trim()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 dark:from-purple-600 dark:to-indigo-700 text-white rounded-xl hover:from-purple-600 hover:to-indigo-700 dark:hover:from-purple-700 dark:hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {validComments.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No comments yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            validComments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-purple-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200"
              >
                {/* Comment Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-indigo-500 dark:from-purple-500 dark:to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {comment.user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100">{comment.user?.username || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {currentUser && comment.user?._id === currentUser._id && (
                    <div className="flex gap-2">
                      {editingId === comment._id ? (
                        <React.Fragment key={`edit-actions-${comment._id}`}>
                          <button
                            onClick={() => handleUpdate(comment._id)}
                            className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={`view-actions-${comment._id}`}>
                          <button
                            onClick={() => handleEdit(comment)}
                            className="p-2 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(comment._id)}
                            className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </div>

                {/* Comment Content */}
                {editingId === comment._id ? (
                  <textarea
                    key={`edit-textarea-${comment._id}`}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-4 border-2 border-purple-200 dark:border-gray-600 rounded-xl focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all duration-200 resize-none bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-800 dark:text-gray-200"
                    rows="3"
                  />
                ) : (
                  <p key={`comment-content-${comment._id}`} className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {comment.content}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogComments;
