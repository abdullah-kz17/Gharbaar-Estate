import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosPrivate, axiosPublic} from "../../utils/axiosInstance.js";

// USER Thunks
export const createServiceProvider = createAsyncThunk(
    "serviceProvider/create",
    async (formData, thunkAPI) => {
        try {
            const res = await axiosPrivate.post("/serviceProvider", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Create failed");
        }
    }
);

export const getMyServiceProvider = createAsyncThunk(
    "serviceProvider/getMy",
    async (_, thunkAPI) => {
        try {
            const res = await axiosPrivate.get("/serviceProvider/me");
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
        }
    }
);

export const updateServiceProvider = createAsyncThunk(
    "serviceProvider/update",
    async (formData, thunkAPI) => {
        try {
            const res = await axiosPrivate.put("/serviceProvider", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
        }
    }
);

export const deleteServiceProvider = createAsyncThunk(
    "serviceProvider/delete",
    async (_, thunkAPI) => {
        try {
            await axiosPrivate.delete("/serviceProvider");
            return true;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
        }
    }
);

export const submitReview = createAsyncThunk(
    "reviews/submit",
    async ({ providerId, comment, rating }, thunkAPI) => {
        try {
            const res = await axiosPrivate.post(`/serviceProvider/review`, {
                providerId,
                comment,
                rating,
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Submit review failed");
        }
    }
);

export const deleteReview = createAsyncThunk(
    "reviews/delete",
    async (id, thunkAPI) => {
        try {
            const res = await axiosPrivate.delete(`/serviceProvider/review/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete review failed");
        }
    }
);

export const getReviewsForProvider = createAsyncThunk(
    "reviews/getForProvider",
    async (id, thunkAPI) => {
        try {
            const res = await axiosPublic.get(`/serviceProvider/reviews/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch reviews failed");
        }
    }
);

// PUBLIC
export const getAllApprovedProviders = createAsyncThunk(
    "serviceProvider/getApproved",
    async (query = "", thunkAPI) => {
        try {
            const res = await axiosPrivate.get(`/serviceProvider${query}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
        }
    }
);

export const getFeaturedProviders = createAsyncThunk(
    "serviceProvider/getFeatured",
    async (_, thunkAPI) => {
        try {
            const res = await axiosPrivate.get("/serviceProvider/featured");
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
        }
    }
);

// Add more for admin later (approve, ban, etc.)

// Admin: Get all providers
export const adminGetAllProviders = createAsyncThunk(
    "admin/getAllProviders",
    async (_, thunkAPI) => {
        try {
            const res = await axiosPrivate.get("/serviceProvider/admin/all");
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch failed");
        }
    }
);

// Admin: Approve a provider
export const adminApproveProvider = createAsyncThunk(
    "admin/approveProvider",
    async (providerId, thunkAPI) => {
        try {
            const res = await axiosPrivate.put(`/serviceProvider/admin/approve/${providerId}`);
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Approval failed");
        }
    }
);

// Admin: Toggle Ban
export const adminToggleBanProvider = createAsyncThunk(
    "admin/toggleBan",
    async (providerId, thunkAPI) => {
        try {
            const res = await axiosPrivate.put(`/serviceProvider/admin/ban/${providerId}`);
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Toggle ban failed");
        }
    }
);

// Admin: Toggle Featured
export const adminToggleFeatured = createAsyncThunk(
    "admin/toggleFeatured",
    async (providerId, thunkAPI) => {
        try {
            const res = await axiosPrivate.put(`/serviceProvider/admin/feature/${providerId}`);
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Toggle featured failed");
        }
    }
);

// Admin: Delete Provider
export const adminDeleteProvider = createAsyncThunk(
    "admin/deleteProvider",
    async (providerId, thunkAPI) => {
        try {
            await axiosPrivate.delete(`/serviceProvider/admin/${providerId}`);
            return providerId; // return deleted ID to filter it out
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
        }
    }
);

export const getServiceProviderById = createAsyncThunk(
    "serviceProvider/getById",
    async (id, thunkAPI) => {
        try {
            const res = await axiosPublic.get(`/serviceProvider/${id}`);
            return res.data.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Fetch by ID failed");
        }
    }
);

