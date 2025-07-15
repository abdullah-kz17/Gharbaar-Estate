// src/store/thunks/adminUserThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {axiosPrivate} from "../../utils/axiosInstance.js";


export const getAllUsers = createAsyncThunk(
    "adminUsers/getAll",
    async ({ page = 1, limit = 10 } = {}, thunkAPI) => {
        try {
            const res = await axiosPrivate.get(`/admin/user?page=${page}&limit=${limit}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
        }
    }
);

export const getUserById = createAsyncThunk(
    "adminUsers/getById",
    async (id, thunkAPI) => {
        try {
            const res = await axiosPrivate.get(`/admin/user/${id}`);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue("User not found");
        }
    }
);

export const makeAdmin = createAsyncThunk(
    "adminUsers/makeAdmin",
    async (id, thunkAPI) => {
        try {
            const res = await axiosPrivate.put(`/admin/user/${id}/make-admin`);
            return res.data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to promote user");
        }
    }
);

export const removeAdmin = createAsyncThunk(
    "adminUsers/removeAdmin",
    async (id, thunkAPI) => {
        try {
            const res = await axiosPrivate.put(`/admin/user/${id}/remove-admin`);
            return res.data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to demote admin");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "adminUsers/deleteUser",
    async (id, thunkAPI) => {
        try {
            const res = await axiosPrivate.delete(`/admin/user/${id}`);
            return res.data.user;
        } catch (err) {
            return thunkAPI.rejectWithValue("Failed to delete user");
        }
    }
);
