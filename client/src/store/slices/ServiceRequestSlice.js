import { createSlice } from "@reduxjs/toolkit";
import {
    sendRequest,
    getMyRequests,
    getProviderRequests,
    respondToRequest,
    deleteRequest,
} from "../thunks/ServiceRequestThunk.js";

const initialState = {
    loading: false,
    error: null,
    myRequests: [],
    providerRequests: [],
};

const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {
        resetRequestState: (state) => {
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Send Request
            .addCase(sendRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.myRequests.unshift(action.payload);
            })
            .addCase(sendRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get My Requests
            .addCase(getMyRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.myRequests = action.payload;
            })
            .addCase(getMyRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Provider Requests
            .addCase(getProviderRequests.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProviderRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.providerRequests = action.payload;
            })
            .addCase(getProviderRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Respond to Request
            .addCase(respondToRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(respondToRequest.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.providerRequests.findIndex(
                    (req) => req._id === action.payload._id
                );
                if (index !== -1) state.providerRequests[index] = action.payload;
            })
            .addCase(respondToRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete Request
            .addCase(deleteRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                state.loading = false;
                const id = action.payload;

                // Remove from both user and provider request arrays
                state.myRequests = state.myRequests.filter((req) => req._id !== id);
                state.providerRequests = state.providerRequests.filter((req) => req._id !== id);
            })
            .addCase(deleteRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectPendingRequestsCount = (state) =>
    state.request.providerRequests.filter((r) => r.status === 'pending').length;

export const { resetRequestState } = requestSlice.actions;
export default requestSlice.reducer;

