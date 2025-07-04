// src/redux/blog/blogThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate, axiosPublic } from "../../utils/axiosInstance";

// Create Blog (Admin only)
export const createBlog = createAsyncThunk("blog/createBlog", async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosPrivate.post("/blog", formData, {
            headers: {
                'Content-Type': "multipart"
            }
        });
        return response.data.blog;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

// Get All Blogs
export const getAllBlogs = createAsyncThunk("blog/getAllBlogs", async ({ page = 1, limit = 9 } = {}, { rejectWithValue }) => {
    try {
        const response = await axiosPublic.get(`/blog?page=${page}&limit=${limit}`);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

// Get Blog by ID
export const getBlogById = createAsyncThunk("blog/getBlogById", async (id, { rejectWithValue }) => {
    try {
        if (!id) {
            return rejectWithValue("Blog ID is required");
        }

        const response = await axiosPublic.get(`/blog/${id}`);

        if (!response.data.success) {
            return rejectWithValue(response.data.message || "Failed to fetch blog");
        }

        return response.data.blog;
    } catch (err) {
        console.error("Error fetching blog by ID:", err);
        return rejectWithValue(
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch blog"
        );
    }
});

// Get Blog by Slug
export const getBlogBySlug = createAsyncThunk("blog/getBlogBySlug", async (slug, { rejectWithValue }) => {
    try {
        const response = await axiosPublic.get(`/blog/slug/${slug}`);
        return response.data.blog;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

// Update Blog (Admin only)
export const updateBlog = createAsyncThunk("blog/updateBlog", async ({ id, formData }, { rejectWithValue }) => {
    try {
        const response = await axiosPrivate.put(`/blog/${id}`, formData);
        return response.data.blog;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

// Delete Blog (Soft Delete)
export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id, { rejectWithValue }) => {
    try {
        await axiosPrivate.delete(`/blog/${id}`);
        return id;
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

// Toggle Like
export const toggleLike = createAsyncThunk("blog/toggleLike", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosPrivate.post(`/blog/${id}/like`);
        return { id, liked: response.data.liked };
    } catch (err) {
        return rejectWithValue(err.response.data.message);
    }
});

// Add Comment
export const addComment = createAsyncThunk(
    "blog/addComment",
    async ({ id, content }, { rejectWithValue }) => {
        try {
            const response = await axiosPrivate.post(`/blog/${id}/comments`, { content });
            return { id, comment: response.data };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Update Comment
export const updateComment = createAsyncThunk(
    "blog/updateComment",
    async ({ id, commentId, content }, { rejectWithValue }) => {
        try {
            await axiosPrivate.put(`/blog/${id}/comments/${commentId}`, { content });
            return { id, commentId, content };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
    "blog/deleteComment",
    async ({ id, commentId }, { rejectWithValue }) => {
        try {
            await axiosPrivate.delete(`/blog/${id}/comments/${commentId}`);
            return { id, commentId };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
