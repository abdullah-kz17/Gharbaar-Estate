// src/redux/blog/blogSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    createBlog, getAllBlogs, getBlogBySlug, getBlogById,
    updateBlog, deleteBlog, toggleLike,
    addComment, updateComment, deleteComment
} from "../thunks/blogThunks";

const initialState = {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    totalPages: 1,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        resetBlogState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Create Blog
            .addCase(createBlog.pending, state => { state.loading = true; })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.unshift(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Blogs
            .addCase(getAllBlogs.pending, state => { state.loading = true; })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload.blogs;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Blog by ID
            .addCase(getBlogById.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBlog = action.payload;
                state.error = null;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.singleBlog = null;
            })

            // Get Blog by Slug
            .addCase(getBlogBySlug.pending, state => { state.loading = true; })
            .addCase(getBlogBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBlog = action.payload;
            })
            .addCase(getBlogBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Blog
            .addCase(updateBlog.fulfilled, (state, action) => {
                const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
                if (index !== -1) state.blogs[index] = action.payload;
                if (state.singleBlog?._id === action.payload._id) state.singleBlog = action.payload;
            })

            // Delete Blog
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
                if (state.singleBlog?._id === action.payload) state.singleBlog = null;
            })

            // Toggle Like
            .addCase(toggleLike.fulfilled, (state, action) => {
                const blog = state.blogs.find(b => b._id === action.payload.id);
                if (blog) {
                    if (action.payload.liked) blog.likes.push("user");
                    else blog.likes.pop();
                }
            })

            .addCase(addComment.fulfilled, (state, action) => {
                if (state.singleBlog?._id === action.payload.id) {
                    state.singleBlog.comments.push(action.payload.comment);
                }
            })

            .addCase(updateComment.fulfilled, (state, action) => {
                const { id, commentId, content } = action.payload;
                if (state.singleBlog?._id === id) {
                    const comment = state.singleBlog.comments.find(c => c._id === commentId);
                    if (comment) comment.content = content;
                }
            })

            .addCase(deleteComment.fulfilled, (state, action) => {
                const { id, commentId } = action.payload;
                if (state.singleBlog?._id === id) {
                    state.singleBlog.comments = state.singleBlog.comments.filter(c => c._id !== commentId);
                }
            })

    },
});

export const { resetBlogState } = blogSlice.actions;
export default blogSlice.reducer;
