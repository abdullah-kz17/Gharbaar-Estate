// src/store/slices/adminUserSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    getAllUsers,
    getUserById,
    makeAdmin,
    removeAdmin,
    deleteUser,
} from "../thunks/UserThunk.js";

const adminUserSlice = createSlice({
    name: "adminUsers",
    initialState: {
        users: [],
        selectedUser: null,
        loading: false,
        error: null,
        success: null,
        total: 0,
        page: 1,
        totalPages: 1,
    },
    reducers: {
        clearAdminUserMessages: (state) => {
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get all users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users || [];
                state.total = action.payload.total || 0;
                state.page = action.payload.page || 1;
                state.totalPages = action.payload.totalPages || 1;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get one user
            .addCase(getUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload;
            })

            // Make admin
            .addCase(makeAdmin.fulfilled, (state, action) => {
                state.success = "User promoted to admin";
                state.users = state.users.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                );
            })

            // Remove admin
            .addCase(removeAdmin.fulfilled, (state, action) => {
                state.success = "Admin role removed";
                state.users = state.users.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                );
            })

            // Soft delete user
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.success = "User deleted";
                state.users = state.users.map((u) =>
                    u._id === action.payload._id ? action.payload : u
                );
            });
    },
});

export const { clearAdminUserMessages } = adminUserSlice.actions;
export default adminUserSlice.reducer;
