import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosPrivate} from "../../utils/axiosInstance.js";

// Add to favorites
export const addToFavorites = createAsyncThunk(
    "favorite/addToFavorites",
    async (propertyId, { rejectWithValue }) => {
        try {
            const res = await axiosPrivate.post("/favourite", { propertyId });
            return res.data.favorite;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Add to favorites failed");
        }
    }
);

// Remove from favorites
export const removeFromFavorites = createAsyncThunk(
    "favorite/removeFromFavorites",
    async (propertyId, { rejectWithValue }) => {
        try {
            await axiosPrivate.delete(`/favourite/${propertyId}`);
            return propertyId;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Remove from favorites failed");
        }
    }
);

// Get all favorites for logged-in user
export const getUserFavorites = createAsyncThunk(
    "favorite/getUserFavorites",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosPrivate.get("/favourite");
            return res.data.favorites;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Get favorites failed");
        }
    }
);
