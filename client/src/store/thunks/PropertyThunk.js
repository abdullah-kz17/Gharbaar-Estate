// src/redux/thunks/PropertyThunk.js
import {createAsyncThunk} from "@reduxjs/toolkit";
import {axiosPrivate, axiosPublic} from "../../utils/axiosInstance.js";

// CREATE
export const createProperty = createAsyncThunk(
    'property/createProperty',
    async ({ formData }, thunkApi) => {
        try {
            console.log("📨 Submitting property to /property/create");
            const { data } = await axiosPrivate.post("/property/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    timeout: 15000,
                },
            });
            console.log("✅ Response from backend:", data);
            return data;
        } catch (error) {
            console.error("❌ Error from backend:", error.response);
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to create property"
            );
        }
    }
);

// READ ALL
export const getAllProperties = createAsyncThunk(
    'property/getAllProperties',
    async ({ page = 1, limit = 12 } = {}, thunkApi) => {
        try {
            const {data} = await axiosPublic.get(`/property/?page=${page}&limit=${limit}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to fetch properties"
            );
        }
    }
);

// USER: Get Properties of Logged-In User
export const getUserProperties = createAsyncThunk(
    'property/getUserProperties',
    async ({ page = 1, limit = 12 } = {}, thunkApi) => {
        try {
            const {data} = await axiosPrivate.get(`/property/user/properties?page=${page}&limit=${limit}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to get your properties"
            );
        }
    }
);


// READ ONE
export const getSingleProperty = createAsyncThunk(
    'property/getSingleProperty',
    async (id, thunkApi) => {
        try {
            const {data} = await axiosPublic.get(`/property/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to fetch property"
            );
        }
    }
);

// UPDATE
export const updateProperty = createAsyncThunk(
    "property/update",
    async ({id, formData}, thunkAPI) => {
        try {
            const res = await axiosPrivate.put(`/property/update/${id}`, formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
        }
    }
);

// DELETE
export const deleteProperty = createAsyncThunk(
    'property/deleteProperty',
    async (id, thunkApi) => {
        try {
            const {data} = await axiosPrivate.delete(`/property/delete/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to delete property"
            );
        }
    }
);


// ADMIN: Get Pending Properties
export const getPendingProperties = createAsyncThunk(
    'property/getPendingProperties',
    async ({ page = 1, limit = 12 } = {}, thunkApi) => {
        try {
            const {data} = await axiosPrivate.get(`/property/approval/pending-properties?page=${page}&limit=${limit}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to get pending properties");
        }
    }
);

// ADMIN: Approve Property
export const approveProperty = createAsyncThunk(
    'property/approveProperty',
    async (id, thunkApi) => {
        try {
            const {data} = await axiosPrivate.patch(`/property/approve/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to approve property");
        }
    }
);

// ADMIN: Ban Property
export const banProperty = createAsyncThunk(
    'property/banProperty',
    async (id, thunkApi) => {
        try {
            const {data} = await axiosPrivate.patch(`/property/ban/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to ban property");
        }
    }
);

// ADMIN: Feature Property
export const featureProperty = createAsyncThunk(
    'property/featureProperty',
    async (id, thunkApi) => {
        try {
            const {data} = await axiosPrivate.patch(`/property/feature/${id}`);
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to feature property");
        }
    }
);

// ADMIN: Delete Property
export const adminDeleteProperty = createAsyncThunk(
    'property/adminDeleteProperty',
    async (id, thunkApi) => {
        try {
            const { data } = await axiosPrivate.delete(`/property/admin/delete/${id}`);
            return { id, ...data };
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Admin failed to delete property"
            );
        }
    }
);


// SEARCH Properties by prompt
// src/redux/thunks/PropertyThunk.js
export const searchProperties = createAsyncThunk(
    'property/searchProperties',
    async ({ prompt }, thunkApi) => {
        try {
            const { data } = await axiosPublic.post('/property/search', { prompt });
            // backend returns: { success, filters, count, properties }
            return data;
        } catch (error) {
            return thunkApi.rejectWithValue(
                error.response?.data?.message || "Failed to search properties"
            );
        }
    }
);

