import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
    createServiceProvider,
    getMyServiceProvider,
    updateServiceProvider,
    deleteServiceProvider,
    getAllApprovedProviders,
    getFeaturedProviders,
    adminGetAllProviders,
    adminApproveProvider,
    adminToggleBanProvider,
    adminToggleFeatured,
    adminDeleteProvider,
    getServiceProviderById,
    submitReview,
    deleteReview,
    getReviewsForProvider,
} from "../thunks/ServiceProviderThunk.js";

const initialState = {
    myProfile: null,
    providers: [],
    featured: [],
    reviews: [],
    averageRating: null,
    selectedProvider: null,
    loading: false,
    error: null,
    success: null,
    page: 1,
    totalPages: 1,
    total: 0,
    pendingTotal: 0,
};

const serviceProviderSlice = createSlice({
    name: "serviceProvider",
    initialState,
    reducers: {
        clearProviderState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        clearAdminProviderState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
        },
        clearReviews: (state) => {
            state.reviews = [];
            state.averageRating = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // ✅ Create
            .addCase(createServiceProvider.fulfilled, (state, action) => {
                state.myProfile = action.payload;
                state.success = "Submitted for approval";
            })
            // ✅ Get my profile
            .addCase(getMyServiceProvider.fulfilled, (state, action) => {
                state.myProfile = action.payload;
            })
            // ✅ Update
            .addCase(updateServiceProvider.fulfilled, (state, action) => {
                state.myProfile = action.payload;
                state.success = "Profile updated";
            })
            // ✅ Delete
            .addCase(deleteServiceProvider.fulfilled, (state) => {
                state.myProfile = null;
                state.success = "Profile deleted";
            })
            // ✅ Approved providers
            .addCase(getAllApprovedProviders.fulfilled, (state, action) => {
                state.providers = action.payload.providers;
                state.page = action.payload.page || 1;
                state.totalPages = action.payload.totalPages || 1;
                state.total = action.payload.total || 0;
            })
            // ✅ Featured
            .addCase(getFeaturedProviders.fulfilled, (state, action) => {
                state.featured = action.payload;
            })
            .addCase(adminGetAllProviders.fulfilled, (state, action) => {
                // If pending filter is used, store pendingTotal
                if (action.meta && action.meta.arg && action.meta.arg.pending) {
                    state.providers = action.payload.providers;
                    state.page = action.payload.page || 1;
                    state.totalPages = action.payload.totalPages || 1;
                    state.pendingTotal = action.payload.total || 0;
                } else {
                    state.providers = action.payload.providers;
                    state.page = action.payload.page || 1;
                    state.totalPages = action.payload.totalPages || 1;
                    state.total = action.payload.total || 0;
                }
            })

            .addCase(adminApproveProvider.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.providers.findIndex(p => p._id === updated._id);
                if (index !== -1) state.providers[index] = updated;
                state.success = "Provider approved";
            })


            .addCase(adminToggleBanProvider.fulfilled, (state, action) => {
                const index = state.providers.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.providers[index] = action.payload;
                state.success = action.payload.isBanned ? "Provider banned" : "Provider unbanned";
            })

            .addCase(adminToggleFeatured.fulfilled, (state, action) => {
                const index = state.providers.findIndex(p => p._id === action.payload._id);
                if (index !== -1) state.providers[index] = action.payload;
                state.success = action.payload.isFeatured ? "Marked as featured" : "Removed from featured";
            })

            .addCase(adminDeleteProvider.fulfilled, (state, action) => {
                state.providers = state.providers.filter(p => p._id !== action.payload.id);
                state.success = "Provider deleted";
            })

            .addCase(getServiceProviderById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
                state.selectedProvider = null;
            })
            .addCase(getServiceProviderById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProvider = action.payload;
            })
            .addCase(getServiceProviderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch provider details";
            })
            // 📥 Reviews
            .addCase(getReviewsForProvider.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews;
                state.averageRating = action.payload.averageRating;
            })

            .addCase(submitReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || "Review submitted";

                const updatedReview = action.payload.review;

                // Try to find by user ID
                let index = state.reviews.findIndex(r => r.user === updatedReview.user);

                // If not found, try to find by review ID
                if (index === -1) {
                    index = state.reviews.findIndex(r => r._id === updatedReview._id);
                }

                // Update or add the review
                if (index !== -1) {
                    state.reviews[index] = updatedReview;
                } else {
                    state.reviews.push(updatedReview);
                }

                state.averageRating = action.payload.averageRating;
            })

    .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || "Review deleted";
                state.reviews = action.payload.reviews || [];
                state.averageRating = action.payload.averageRating;
            })

            // 🧼 Common error handler
            .addMatcher(
                isAnyOf(
                    createServiceProvider.rejected,
                    getMyServiceProvider.rejected,
                    updateServiceProvider.rejected,
                    deleteServiceProvider.rejected,
                    getAllApprovedProviders.rejected,
                    getFeaturedProviders.rejected,
                    getReviewsForProvider.rejected,
                    submitReview.rejected,
                    deleteReview.rejected
                ),
                (state, action) => {
                    state.error = action.payload;
                    state.loading = false;
                }
            )

            // 🌀 Common pending handler
            .addMatcher(
                isAnyOf(
                    createServiceProvider.pending,
                    getMyServiceProvider.pending,
                    updateServiceProvider.pending,
                    deleteServiceProvider.pending,
                    getAllApprovedProviders.pending,
                    getFeaturedProviders.pending,
                    getReviewsForProvider.pending,
                    submitReview.pending,
                    deleteReview.pending
                ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = null;
                }
            )

            // ✅ Common fulfilled handler to reset loading
            .addMatcher(
                isAnyOf(
                    createServiceProvider.fulfilled,
                    getMyServiceProvider.fulfilled,
                    updateServiceProvider.fulfilled,
                    deleteServiceProvider.fulfilled,
                    getAllApprovedProviders.fulfilled,
                    getFeaturedProviders.fulfilled
                ),
                (state) => {
                    state.loading = false;
                }
            );
    },
});

export const { clearProviderState,clearAdminProviderState,clearReviews } = serviceProviderSlice.actions;
export default serviceProviderSlice.reducer;
