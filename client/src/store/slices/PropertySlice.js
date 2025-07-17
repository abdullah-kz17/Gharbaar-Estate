// src/redux/slices/propertySlice.js
import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import {
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty,
    getPendingProperties,
    approveProperty,
    banProperty,
    featureProperty,
    getUserProperties,
    searchProperties,
} from "../thunks/PropertyThunk.js";

const initialState = {
    properties: [],
    property: null,
    userProperties: [],
    pendingProperties: [],
    searchResults: [],     // Search result properties from backend
    searchFilters: null,   // Filters extracted by backend AI
    searchCount: 0,        // Number of matched properties
    loading: false,
    error: null,
    success: false,
    adminMessage: null,
    page: 1,
    totalPages: 1,
    total: 0,
    pendingPage: 1,
    pendingTotalPages: 1,
    pendingTotal: 0,
    // Add pagination for user properties
    userPage: 1,
    userTotalPages: 1,
    userTotal: 0,
    pendingCount: 0,
    approvedCount: 0,
};

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        resetProperty: (state) => {
            state.properties = [];
            state.property = null;
            state.userProperties = [];
            state.pendingProperties = [];
            state.searchResults = [];
            state.searchFilters = null;
            state.searchCount = 0;
            state.loading = false;
            state.error = null;
            state.success = false;
            state.adminMessage = null;
            state.page = 1;
            state.totalPages = 1;
            state.total = 0;
            state.pendingPage = 1;
            state.pendingTotalPages = 1;
            state.pendingTotal = 0;
            state.userPage = 1;
            state.userTotalPages = 1;
            state.userTotal = 0;
            state.pendingCount = 0;
            state.approvedCount = 0;
        },

        removePropertyFromPending: (state, action) => {
            state.pendingProperties = state.pendingProperties.filter(
                (p) => p._id !== action.payload
            );
        },
    },

    extraReducers: (builder) => {
        builder
            // CREATE
            .addCase(createProperty.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.property = payload.property;
                state.success = true;
            })

            // READ ALL
            .addCase(getAllProperties.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.properties = payload.properties;
                state.page = payload.page || 1;
                state.totalPages = payload.totalPages || 1;
                state.total = payload.total || 0;
                state.success = true;
            })

            // USER: Get logged-in user's properties
            .addCase(getUserProperties.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.userProperties = payload.properties;
                state.userPage = payload.page || 1;
                state.userTotalPages = payload.totalPages || 1;
                state.userTotal = payload.total || 0;
                state.pendingCount = payload.pendingCount || 0;
                state.approvedCount = payload.approvedCount || 0;
                state.success = true;
            })

            // READ ONE
            .addCase(getSingleProperty.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.property = payload.property;
                state.success = true;
            })

            // UPDATE
            .addCase(updateProperty.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.property = payload;
                // Update in userProperties if present
                const index = state.userProperties.findIndex((p) => p._id === payload._id);
                if (index !== -1) {
                    state.userProperties[index] = payload;
                }
                state.success = true;
            })

            // DELETE
            .addCase(deleteProperty.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = true;
                state.properties = state.properties.filter((p) => p._id !== payload.propertyId);
            })

            // ADMIN: Get Pending Properties
            .addCase(getPendingProperties.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.pendingProperties = payload.properties;
                state.pendingPage = payload.page || 1;
                state.pendingTotalPages = payload.totalPages || 1;
                state.pendingTotal = payload.total || 0;
                state.success = true;
            })

            // ADMIN: Approve Property
            .addCase(approveProperty.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminMessage = "Property approved";
                state.pendingProperties = state.pendingProperties.filter(
                    (p) => p._id !== payload.property._id
                );
                state.success = true;
            })

            // ADMIN: Ban Property
            .addCase(banProperty.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.adminMessage = "Property banned";
                state.pendingProperties = state.pendingProperties.filter(
                    (p) => p._id !== payload.property._id
                );
                state.success = true;
            })

            // ADMIN: Feature Property
            .addCase(featureProperty.fulfilled, (state) => {
                state.loading = false;
                state.adminMessage = "Property featured";
                state.success = true;
            })

            // SEARCH Properties by prompt
            .addCase(searchProperties.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(searchProperties.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.success = payload.success ?? true;
                state.searchResults = payload.properties || [];
                state.searchFilters = payload.filters || null;
                state.searchCount = payload.count || 0;
            })
            .addCase(searchProperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to search properties";
                state.success = false;
                state.searchResults = [];
                state.searchFilters = null;
                state.searchCount = 0;
            })

            // Match pending actions that start with "property/"
            .addMatcher(
                (action) => action.type.startsWith("property/") && isPending(action),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                }
            )

            // Match rejected actions that start with "property/"
            .addMatcher(
                (action) => action.type.startsWith("property/") && isRejected(action),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || "Something went wrong";
                    state.success = false;
                }
            );
    },
});

export const { resetProperty, removePropertyFromPending } = propertySlice.actions;

export default propertySlice.reducer;
