import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../../utils/axiosInstance";

// 📨 1. Send a request to a provider
export const sendRequest = createAsyncThunk(
    "request/send",
    async ({ providerId, message }, { rejectWithValue }) => {
        try {
            const res = await axiosPrivate.post("/request", { providerId, message });
            return res.data.request;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to send request");
        }
    }
);

// 📥 2. Get requests sent by the logged-in user
export const getMyRequests = createAsyncThunk(
    "request/getMy",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosPrivate.get("/request/my-requests");
            return res.data.requests;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to load your requests");
        }
    }
);

// 📬 3. Get requests received by the logged-in provider
export const getProviderRequests = createAsyncThunk(
    "request/getProvider",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosPrivate.get("/request/provider-requests");
            return res.data.requests;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to load provider requests");
        }
    }
);

// ✅ 4. Provider responds to a request
export const respondToRequest = createAsyncThunk(
    "request/respond",
    async ({ requestId, status, response }, { rejectWithValue }) => {
        try {
            const res = await axiosPrivate.put(`/request/respond/${requestId}`, { status, response });
            return res.data.request;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to respond to request");
        }
    }
);

// ❌ 5. Delete a request (by user)
export const deleteRequest = createAsyncThunk(
    "request/delete",
    async (requestId, { rejectWithValue }) => {
        try {
            await axiosPrivate.delete(`/request/${requestId}`);
            return requestId;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete request");
        }
    }
);
