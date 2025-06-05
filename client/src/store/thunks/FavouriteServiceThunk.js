// src/redux/favoriteServices/favoriteServicesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosPrivate} from "../../utils/axiosInstance.js";


// Add to favorite services
export const addFavoriteService = createAsyncThunk(
    "favoriteServices/add",
    async (serviceProviderId, thunkAPI) => {
        try {
            const response = await axiosPrivate.post("/favoriteService/", { serviceProviderId });
            return response.data.favorite;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add to favorites");
        }
    }
);

// Remove from favorite services
export const removeFavoriteService = createAsyncThunk(
    "favoriteServices/remove",
    async (serviceProviderId, thunkAPI) => {
        try {
            await axiosPrivate.delete(`/favoriteService/${serviceProviderId}`);
            return serviceProviderId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to remove from favorites");
        }
    }
);

// Get user’s favorite services
export const fetchFavoriteServices = createAsyncThunk(
    "favoriteServices/fetch",
    async (_, thunkAPI) => {
        try {
            const response = await axiosPrivate.get("/favoriteService/");
            return response.data.favorites;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load favorites");
        }
    }
);
