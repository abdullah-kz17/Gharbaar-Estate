import { createSlice } from "@reduxjs/toolkit";
import {
    addToFavorites,
    removeFromFavorites,
    getUserFavorites
} from "../thunks/FavouriteThunk.js";

const initialState = {
    favorites: [],
    loading: false,
    error: null,
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        resetFavorites: (state) => {
            state.favorites = [];
            state.loading = false;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Favorites
            .addCase(getUserFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.favorites = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getUserFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch favorites";
                state.favorites = [];
            })

            // Add to Favorites
            .addCase(addToFavorites.pending, (state) => {
                state.error = null;
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.error = null;

                const newFavorite = action.payload;
                const newId =
                    newFavorite?.propertyId?._id ||
                    newFavorite?.propertyId ||
                    newFavorite?._id;

                const exists = state.favorites.some(fav => {
                    const existingId =
                        fav?.propertyId?._id ||
                        fav?.propertyId ||
                        fav?._id;
                    return existingId === newId;
                });

                if (!exists && newFavorite) {
                    state.favorites.push(newFavorite);
                }
            })
            .addCase(addToFavorites.rejected, (state, action) => {
                state.error = action.payload || "Failed to add to favorites";
            })

            // Remove from Favorites
            .addCase(removeFromFavorites.pending, (state) => {
                state.error = null;
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.error = null;

                const removedId = action.payload?.propertyId || action.meta?.arg;

                state.favorites = state.favorites.filter(fav => {
                    const favId =
                        fav?.propertyId?._id ||
                        fav?.propertyId ||
                        fav?._id;
                    return favId !== removedId;
                });
            })
            .addCase(removeFromFavorites.rejected, (state, action) => {
                state.error = action.payload || "Failed to remove from favorites";
            });
    }
});

export const { resetFavorites, clearError } = favoriteSlice.actions;
export default favoriteSlice.reducer;
